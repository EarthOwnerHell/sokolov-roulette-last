const { model, Schema } = require('mongoose');

const Game = model('Game', new Schema({
    peerId: { type: Number, default: 0 },
    hash: { type: String, default: '' },
    hashKey: { type: String, default: '' },
    gameMode: { type: String, default: '' },
    endTime: { type: Number, default: 30_000 },
    results: { type: Array },
    isEnded: { type: Boolean, default: false },
    isStarted: { type: Boolean, default: false }
    }))

module.exports = Game
