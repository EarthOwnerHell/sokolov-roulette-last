const Comment = require('../models/Comments.js')

const comment = {
    get: (postId) => Comment.findOne({ postId }).lean(),
    add: (postId) => {
        return Comment.create({ postId })
    },
    addComment: (postId, userId) => {
        Comment.updateOne({
            postId
        }, {
            $push: {
                comments: userId
            }
        }).then()
    }
}

module.exports = comment
