const { model, Schema } = require('mongoose')

const Like = model('Like', new Schema({
    postId: { type: Number, index: true },
    likers: { type: Array, default: [] },
}))

module.exports = Like