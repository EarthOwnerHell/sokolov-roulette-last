const { model, Schema } = require('mongoose')

const Bets = model('Bets', new Schema({
    gameId: { type: String, default: '' },
    userId: { type: Number, default: 0 },
    betType: { type: String, default: "" },
    betAmount: { type: Number, default: 0 }
}))

module.exports = Bets
