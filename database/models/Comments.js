const { model, Schema } = require('mongoose')

const Comment = model('Comment', new Schema({
    postId: { type: Number, index: true },
    comments: { type: Array, default: [] },
}))

module.exports = Comment