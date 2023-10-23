const { numberWithSpace } = require("../../settings/tools")
const Bets = require("../models/Bets")

const bet = {
    getBet: (peerId) => Bets.findOne({ peerId, isEnded: false }).lean(),
    createBet: (props) => {
        const { gameId, userId, betType, betAmount } = props
        const bet = new Bets({
            gameId,
            userId,
            betType,
            betAmount
        })
        bet.save().then(console.log(`Новая ставка!\n---\nПоставил: https://vk.com/id${userId}\n---\nСтавка на: ${betType}\n---\nСумма: ${numberWithSpace(betAmount)} 🎲\n---\nID игры: ${gameId}`))
    },
    getBets: (gameId) =>  Bets.find({ gameId: gameId }).lean()
}
module.exports = bet