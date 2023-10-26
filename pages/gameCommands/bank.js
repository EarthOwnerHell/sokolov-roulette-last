const bet = require("../../database/managers/bet");
const chat = require("../../database/managers/chat");
const game = require("../../database/managers/game");
const { getUser } = require("../../database/managers/user");
const { numberWithSpace, convertMsToSec } = require("../../settings/tools");
const { getVkNameById, vkHelp } = require("../../settings/vk");
const  { gamePayloadsTranslate } = require("./gameTools");
const { randomDependingMode, totalValues, makeArrayFromObject } = require("./generateCombination");
const { createHash, createSecretWord } = require("./hash");

module.exports = bank = async (msg) => {
    const { id, name } = await getUser(msg.senderId)

    const peerId = msg.peerId

    const checkGame = await game.getGame(peerId)

    let gameId = ''

    if (!checkGame){
        const checkChat = await chat.getChat(peerId)

        const gameMode = checkChat.game

        const valuesForHash = randomDependingMode[gameMode]()

        const arrayValues = makeArrayFromObject(valuesForHash)

        const hashData = totalValues(arrayValues)

        let secretWord = createSecretWord(hashData, gameMode)

        secretWord = hashData + secretWord

        const hash = createHash(secretWord);

        const newGame = await game.createGame({peerId,hash,hashKey:secretWord,gameMode: gameMode,endTime:Date.now() + 30_000,results:valuesForHash,isEnded:false});

        return msg.send(`🏦 @id${id}(${name}), ставок пока нет!\n\n&#10067; Хэш игры: ${hash}`)
    }
    if (checkGame) {
        gameId = await game.getGameId(peerId)
    }

    const bets = await bet.getBets(gameId)
    
    if (bets.length == 0){
        return msg.send(`🏦 @id${id}(${name}), ставок пока нет!\n\n&#10067; Хэш игры: ${checkGame.hash}`)
    }
    let suppliersText = ''
    let betsAmount = 0

    const betsTexts = {}

    for (let i = 0; i < bets.length; i++){
        const betType = bets[i].betType
        const betAmount = bets[i].betAmount
        const userId = bets[i].userId
        let betText = betsTexts[betType]
        if (!betText) {
            betText = gamePayloadsTranslate[betType][2]
            betsTexts[betType] = betText
        }
        betsTexts[betType] += `    @id${userId}(${name}) → ${numberWithSpace((betAmount).toFixed(0))} 🎲\n`
        betsAmount += betAmount
    }
<<<<<<< HEAD
    const betsTextsArray = Object.entries(betsTexts)
    for (let i = 0; i < betsTextsArray.length; i++){
        suppliersText += betsTextsArray[i][1]
=======
    gameModel = Object.entries(gameModel)
    for (let i = 0; i < gameModel.length; i++){
        elementInModel = gameModel[i]
        elementInModel[1].length == 0 ? '' : suppliers += `\n\n${forBetText[elementInModel[0]][0]} Ставки на ${forBetText[elementInModel[0]][1]}:\n${elementInModel[1].join('')}`
>>>>>>> cc5aa2aa8cbe00cb62c8327f0ccdeae2b78f8645
    }
    const totalText = `🏦 Банк раунда: ${numberWithSpace(betsAmount.toFixed(0))} 🎲\n\n` + suppliersText  + `\n\n&#10067; Хэш игры: ${checkGame.hash}` + `\n⌛ До конца раунда: ${convertMsToSec(checkGame.endTime - Date.now())} с`
    return msg.send(totalText)
}
