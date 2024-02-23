const bet = require('../../database/managers/bet');
const chat = require('../../database/managers/chat');
const game = require('../../database/managers/game');
const { getUser } = require('../../database/managers/user');
const { numberWithSpace, convertSecToBeautySec } = require('../../settings/tools');
const { gamePayloadsTranslate } = require('./gameTools');
const { randomDependingMode, totalValues, makeArrayFromObject } = require('./generateCombination');
const { createHash, createSecretWord } = require('./hash');

module.exports = bank = async (msg) => {
  const { id, name } = await getUser(msg.senderId);

  const peerId = msg.peerId;

  const thisChat = await chat.getChat(peerId);

  const endTimeChat = thisChat.endTime;

  const gameMode = thisChat.game;

  const checkGame = await game.getGame(peerId);

  let gameId = '';

  if (!checkGame || checkGame.gameMode != gameMode) {
    if (checkGame && checkGame.gameMode != gameMode) {
      const betsOnGame = await bet.getBets(checkGame._id);
      if (betsOnGame.length > 0) return;
      const delGame = await game.deleteGame(checkGame._id);
    }
    const valuesForHash = randomDependingMode[gameMode]();

    const arrayValues = makeArrayFromObject(valuesForHash);

    const hashData = totalValues(arrayValues);

    let secretWord = createSecretWord(hashData, gameMode);

    secretWord = hashData + secretWord;

    const hash = createHash(secretWord);

    const newGame = await game.createGame({
      peerId,
      hash,
      hashKey: secretWord,
      gameMode: gameMode,
      endTime: endTimeChat,
      results: valuesForHash,
      isEnded: false,
      isStarted: false,
    });

    return msg.send(
      `🏦 @id${id}(${name}), ставок пока нет!\n\n&#10067; Хэш игры: ${hash}\n⌛ До конца раунда: ${convertSecToBeautySec(
        endTimeChat / 1000,
      )}`,
    );
  }

  if (checkGame) {
    gameId = await game.getGameId(peerId);
  }

  const endTime = checkGame.endTime;

  const bets = await bet.getBets(gameId);

  if (bets.length == 0) {
    return msg.send(
      `🏦 @id${id}(${name}), ставок пока нет!\n\n&#10067; Хэш игры: ${
        checkGame.hash
      } \n⌛ До конца раунда: ${convertSecToBeautySec(endTimeChat / 1000)}`,
    );
  }
  let suppliersText = '';
  let betsAmount = 0;

  const betsTexts = {};

  bets.forEach((userBet) => {
    const betType = userBet.betType;
    const betAmount = userBet.betAmount;
    const userId = userBet.userId;
    const userName = userBet.userName;
    let betText = betsTexts[betType];
    if (!betText) {
      betText = gamePayloadsTranslate[betType][2];
      betsTexts[betType] = betText;
    }
    betsTexts[betType] += `    @id${userId}(${userName}) → ${numberWithSpace(
      betAmount.toFixed(0),
    )} 💎\n`;
    betsAmount += betAmount;
  });

  const betsTextsArray = Object.entries(betsTexts);
  betsTextsArray.forEach(async (bet) => {
    suppliersText += bet[1];
  });

  const totalText =
    `🏦 Банк раунда: ${numberWithSpace(betsAmount.toFixed(0))} 💎\n\n` +
    suppliersText +
    `\n\n&#10067; Хэш игры: ${checkGame.hash}` +
    `\n⌛ До конца раунда: ${convertSecToBeautySec((endTime - Date.now()) / 1000)}`;
  return msg.send(totalText);
};
