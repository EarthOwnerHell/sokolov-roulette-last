const bet = require("../../database/managers/bet");
const game = require("../../database/managers/game");
const { getUser, minusBalanceUser } = require("../../database/managers/user");
const { gamePayloadsTranslate } = require("./gameTools");
const { randomDependingMode, makeArrayFromObject, totalValues } = require("./generateCombination");
const { createSecretWord, createHash } = require("./hash");
const chat = require("../../database/managers/chat");
const { numberWithSpace, convertMsToSec } = require("../../settings/tools");
const { betKeyboard } = require("../../keyboards/inline");

module.exports = makeBet = async (msg) => {
    const { balance, id, name } = await getUser(msg.senderId)

    const peerId = msg.peerId

    const thisChat = await chat.getChat(peerId)

    const endTimeChat = thisChat.endTime

    let gameId = ''

    const gameMode = thisChat.game

    let payload = msg.messagePayload.command

    let splitPayload = payload.split(':')

    const betOn = splitPayload[1]

    const checkGame = await game.getGame(peerId)

    let isStarted = false

    if (!checkGame || checkGame.gameMode != gameMode){
        if (checkGame && checkGame.gameMode != gameMode){
            const betsOnGame = await bet.getBets(checkGame._id)
            if(betsOnGame.length > 0) return
            const delGame = await game.deleteGame(checkGame._id)
        }
        const valuesForHash = randomDependingMode[gameMode]()

        const arrayValues = makeArrayFromObject(valuesForHash)

        const hashData = totalValues(arrayValues)

        let secretWord = createSecretWord(hashData, gameMode)

        secretWord = hashData + secretWord

        const hash = createHash(secretWord);

        const newGame = await game.createGame({peerId,hash,hashKey:secretWord,gameMode: gameMode, endTime: endTimeChat, results:valuesForHash, isEnded:false, isStarted: false});

        gameId = newGame._id

        isStarted = false
    }

    if (checkGame) {
        gameId = await game.getGameId(peerId)
        isStarted = true
    }

    if(checkGame){
        const betsThisGame = await bet.getBets(gameId)
        console.log(checkGame.endTime - Date.now())
        if(betsThisGame.length > 0 && checkGame.endTime - Date.now() <= 3_000) return msg.send(`🕖❗ @id${id}(${name}), нельзя сделать ставку за 3 секунды до конца раунда!`)
    }

    let userBet = await msg.question(`${gamePayloadsTranslate[betOn][0]} @id${id}(${name}), введите ставку на ${gamePayloadsTranslate[betOn][1]}:`, {keyboard: betKeyboard(balance)}) 

    console.log(userBet)

    if (!balance) return msg.send(`❗ У вас нет 🎲 на балансе.`)

    let reserve = 10000000000

    const forBet = userBet.text.includes('[club210769620|@sokolov_roulette] ') ? userBet.text.split('[club210769620|@sokolov_roulette] ') : userBet.text

    let finalBet = Array.isArray(forBet) ? Number(forBet[1].replace(/к/g, "000").replace(/\s/g, "")) : typeof forBet == String ? Number(forBet.replace(/к/g, "000").replace(/\s/g, "")) : Number(forBet)

    if (!finalBet || finalBet < 0) return msg.send(`❗ Что-то не так, проверьте введённые данные`)

    if (finalBet > balance) return msg.send(`❗ У вас нет столько 🎲`)

    if (finalBet > reserve.balance) return msg.send(`❗ В данный момент резерв бота мал для такой ставки, повторите попытку позднее`)

    if (isStarted == false){
        const gameChangeStatus = game.changeStartStatus(gameId)
        const startGame = game.startEndTime(gameId, endTimeChat + Date.now())
    } else if (isStarted == true){
        const bets = await bet.getBets(gameId)
        if (bets.length == 0){
            const gameChangeStatus = game.changeStartStatus(gameId)
            const startGame = game.startEndTime(gameId, endTimeChat + Date.now())
        }
    }

    const betsThisGame = await bet.getBetsUser(gameId, id)

    console.log(betsThisGame)

    if(betsThisGame.length == 0){
        const newBet = await bet.createBet({
            gameId: gameId,
            userId : id,
            betType: betOn,
            betAmount: Number(finalBet)
        })
    }
    let editBet = ''
    let newBet = ''
    for(let i = 0; i < betsThisGame.length; i++){
        const checkType = betsThisGame[i].betType
        console.log(betOn, checkType, betOn == checkType)
        if(betOn == checkType){
            editBet = await bet.editBet(gameId, id, checkType, Number(finalBet))
            break
        } else {
            const newBet = await bet.createBet({
                gameId: gameId,
                userId : id,
                betType: betOn,
                betAmount: Number(finalBet)
            })
            break
        }
    }

        minusBalanceUser(id, Number(finalBet))

        return msg.send(`✅ @id${id}(${name}), успешная ставка ${numberWithSpace(finalBet.toFixed(0))} 🎲 на ${gamePayloadsTranslate[betOn][1]}!`)
    }
