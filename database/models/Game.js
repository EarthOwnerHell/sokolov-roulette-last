const { model, Schema } = require('mongoose');

const Game = model('Game', new Schema({
    peerId: { type: Number, default: 0 },
    hash: { type: String, default: '' },
    hashKey: { type: String, default: '' },
    gameMode: { type: String, default: '' },
    endTime: { type: Number, default: Date.now() + 30_000 },
    results: { type: Object },
    isEnded: { type: Boolean, default: false }
    }))

module.exports = Game
