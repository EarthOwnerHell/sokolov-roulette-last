const { createHash } = require("crypto");
const bet = require("../../database/managers/bet");
const game = require("../../database/managers/game");
const { getUser } = require("../../database/managers/user");
const { forBetText } = require("./gameTools");
const { randomDependingMode, makeArrayFromObject, totalValues } = require("./generateCombination");
const { createSecretWord } = require("./hash");
const chat = require("../../database/managers/chat");

module.exports = makeBet = async (msg) => {
    const { balance, id, name } = await getUser(msg.senderId)

    let gameId = ''

    const peerId = msg.peerId

    let payload = msg.messagePayload.command

    let splitPayload = payload.split(':')

    const betOn = splitPayload[1]

    const checkChat = await chat.getChat(peerId)

    const gameMode = checkChat.game

    const checkGame = await game.getGame(peerId)

    if (!checkGame){
        const valuesForHash = randomDependingMode[gameMode]()

        const arrayValues = makeArrayFromObject(valuesForHash)

        const hashData = totalValues(arrayValues)

        let secretWord = createSecretWord(hashData, gameMode)

        secretWord = hashData + secretWord

        const hash = createHash(secretWord);

        const newGame = await game.createGame({peerId,hash,hashKey:secretWord,gameMode: gameMode,endTime:60,results:valuesForHash,isEnded:false});

        return msg.send(`🏦 @id${id}(${name}), ставок пока нет!\n\n&#10067; Хэш игры: ${hash}`)
    }
    if (checkGame) {
        gameId = await game.getGameId(peerId)
    }


    let userBet = await msg.question(`${forBetText[betOn][0]} @id${id}(${name}), введите ставку на ${forBetText[betOn][1]}:`) //{keyboard: blackjackBet(balance)})

    let betAmount = userBet.text//Number(userBet.text.replace(/к/g, "000").replace(/\s/g, ""));

    const newBet = await bet.createBet({
        gameId: gameId,
        userId : id,
        betType: betOn,
        betAmount: Number(betAmount)
    })
    return msg.send(`✅ @id${id}(${name}), успешная ставка на ${forBetText[betOn][1]}!`)
}
