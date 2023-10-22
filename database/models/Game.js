const { model, Schema } = require('mongoose');

const defaultValue = (type, value, index = false) => ({ type, default: value, index });

const Game = model('Game', new Schema({
    peerId: defaultValue(Number, 0),
    hash: defaultValue(String, ''),
    hashKey: defaultValue(String, ''),
    gameMode: defaultValue(String, ''),
    endTime: defaultValue(Number, 60),
    color: defaultValue(String, ''),
    number: defaultValue(Number, 0),
    isEnded: defaultValue(Boolean, false)
}))

module.exports = Game