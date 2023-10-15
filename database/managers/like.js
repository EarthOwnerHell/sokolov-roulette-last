const Like = require("../models/Like");

const like = {
    get: (postId) => Like.findOne({ postId }).lean(),
    add: (postId) => {
        return Like.create({ postId })
    },
    addLiker: (postId, userId) => {
        Like.updateOne({
            postId
        }, {
            $push: {
                likers: userId
            }
        }).then()
    }
}

module.exports = like