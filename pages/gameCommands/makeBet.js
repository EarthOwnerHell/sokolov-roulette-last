const bet = require("../../database/managers/bet");
const game = require("../../database/managers/game");
const { getUser } = require("../../database/managers/user");
const { commandArgs } = require("../../settings/tools");
const { vk, questionManager } = require("../../settings/vk");
const { forBetText } = require("./gameTools");

vk.updates.use(questionManager.middleware);

module.exports = makeBet = async (msg) => {
    const { text, senderId } = msg
    const { balance, id, name } = await getUser(msg.senderId)

    let gameId = ''

    const peerId = msg.peerId

    let payload = msg.messagePayload.command

    let splitPayload = payload.split(':')

    const betOn = splitPayload[1]

    const checkGame = await game.getGame(peerId)

    console.log(checkGame)

    if (!checkGame) return newGame = await game.createGame({
        peerId: peerId,
        hash: 'лоооол', 
        hashKey: "лооолkey", 
        duration: 60, 
        color: 'красное', 
        number: 24, 
        isEnded: false})

    if (checkGame) {
        gameId = await game.getGameId(peerId)
    }
    let userBet = await questionManager.ask(msg, `${forBetText[betOn][0]} @id${id}(${name}), введите ставку на ${forBetText[betOn][1]}:`) //{keyboard: blackjackBet(balance)})

    let betAmount = userBet.text//Number(userBet.text.replace(/к/g, "000").replace(/\s/g, ""));

    await msg.send(betAmount)

    const newBet = await bet.createBet({
        gameId: gameId,
        userId : id,
        betType: betOn,
        betAmount: Number(betAmount)
    })
    return msg.send(`✅ @id${id}(${name}), успешная ставка на ${forBetText[betOn][1]}!`)
}
