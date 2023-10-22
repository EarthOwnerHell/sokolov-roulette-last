const bet = require("../../database/managers/bet");
const chat = require("../../database/managers/chat");
const game = require("../../database/managers/game");
const { getUser } = require("../../database/managers/user");
const { numberWithSpace } = require("../../settings/tools");
const { getVkNameById, vkHelp } = require("../../settings/vk");
const  { forBetText, gameModelsForBank } = require("./gameTools");
const { randomDependingMode, totalValues, makeArrayFromObject } = require("./generateCombination");
const { createHash, createSecretWord } = require("./hash");

module.exports = bank = async (msg) => {
    const { id, name } = await getUser(msg.senderId)

    const peerId = msg.peerId

    const checkChat = await chat.getChat(peerId)

    const gameMode = checkChat.game

    let gameId = ''

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

    const bets = await bet.getBets(gameId)
    
    if (bets.length == 0){
        return msg.send(`🏦 @id${id}(${name}), ставок пока нет!\n\n&#10067; Хэш игры: ${checkGame.hash}`)
    }
    let suppliers = ''
    let gameModel = gameModelsForBank[gameMode]
    let betsAmount = 0
    for (let i = 0; i < bets.length; i++){
        const userBet = bets[i]
        console.log(userBet.betType)
        const name = await getVkNameById(userBet.userId)
        console.log(userBet.userId)
        betsAmount += userBet.betAmount
        const forAddingSupplier = `   @id${userBet.userId}(${name}) → ${numberWithSpace((userBet.betAmount).toFixed(0))} Кубиков\n`
        gameModel[userBet.betType].push(forAddingSupplier)
    }
    gameModel = Object.entries(gameModel)
    for (let i = 0; i < gameModel.length; i++){
        b = gameModel[i]
        console.log(b)
        b[1].length == 0 ? '' : suppliers += `\n\n${forBetText[b[0]][0]} Ставки на ${forBetText[b[0]][1]}:\n${b[1].join('')}`
    }
    gameModelsForBank[gameMode] = gameMode == 'l7m' ? {'odd' : [], 'even' : [],'more' : [], 'less' : [], 'seven' : []} : gameMode == 'wheel' ? {'odd' : [], 'even' : [],'1-12' : [], '13-24' : [], '25-36' : [],'red' : [], 'black' : [], 'zero' : []} : gameMode == 'dice' ? {'odd' : [], 'even' : [],'1-4' : [], '5-8' : [], '9-12' : [],'black' : [], 'white' : [], 'golden' : []} : gameMode == 'cube' ? {'odd' : [], 'even' : [], 'one' : [], 'two' : [], 'three' : [], 'four' : [], 'five' : [], 'six' : []} : {'2X' : [], '3X' : [], '5X' : [], '10X' : []} 
    const totalText = `🏦 Банк раунда: ${numberWithSpace(betsAmount.toFixed(0))}\n\n` + suppliers  + `\n\n&#10067; Хэш игры: ${checkGame.hash}` + `\n⌛ До конца раунда: ${checkGame.endTime} с`
    return msg.send(totalText)
}