const { model, Schema } = require('mongoose')

const Repost = model('Repost', new Schema({
    postId: { type: Number, index: true },
    reposters: { type: Array, default: [] },
    bonuseAmount: { type: Number },
    active: { type: Boolean, default: true }
}))

module.exports = Repost