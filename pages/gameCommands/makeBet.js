const bet = require("../../database/managers/bet");
const game = require("../../database/managers/game");
const { getUser } = require("../../database/managers/user");
const { gamePayloadsTranslate } = require("./gameTools");
const { randomDependingMode, makeArrayFromObject, totalValues } = require("./generateCombination");
const { createSecretWord, createHash } = require("./hash");
const chat = require("../../database/managers/chat");
const { numberWithSpace } = require("../../settings/tools");

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
    }
    if (checkGame) {
        gameId = await game.getGameId(peerId)
    }

    let userBet = await msg.question(`${gamePayloadsTranslate[betOn][0]} @id${id}(${name}), введите ставку на ${gamePayloadsTranslate[betOn][1]}:`) //{keyboard: blackjackBet(balance)})
    if (!balance) return msg.send(`❗ У вас нет 🎲 на балансе.`)
    let reserve = 10000000000
    let finalBet = Number(userBet.text.replace(/к/g, "000").replace(/\s/g, ""));
    if (!finalBet || finalBet < 0) return msg.send(`❗ Что-то не так, проверьте введённые данные`)
    if (finalBet > balance) return msg.send(`❗ У вас нет столько 🎲`)
    if (finalBet > reserve) return msg.send(`❗ В данный момент резерв бота мал для такой ставки, повторите попытку позднее`)

    const newBet = await bet.createBet({
        gameId: gameId,
        userId : id,
        betType: betOn,
        betAmount: Number(finalBet)
    })
    return msg.send(`✅ @id${id}(${name}), успешная ставка ${numberWithSpace(finalBet.toFixed(0))} 🎲 на ${gamePayloadsTranslate[betOn][1]}!`)
}
