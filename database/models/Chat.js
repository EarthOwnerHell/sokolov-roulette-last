const { model, Schema } = require('mongoose')

const defaultValue = (type, value, index = false) => ({ type, default: value, index });

const Chat = model('Chat', new Schema({
    peerId: defaultValue(Number, 0),
    game: defaultValue(String, ''),
    botAdmin: defaultValue(Boolean, false),
    endTime: defaultValue(Number, 60_000),
    admins: defaultValue(Array, [])
}))

module.exports = Chat