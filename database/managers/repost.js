const Repost = require("../models/Repost");

const repost = {
    get: (postId) => Repost.findOne({ postId }),
    add: ({ postId, bonuseAmount }) => {
        Repost.create({
            postId,
            bonuseAmount
        }).then(console.log('[ 🎁 ] Создали бонус за репост\n'))
    },
    addReposter: (postId, userId) => {
        Repost.updateOne({
            postId: postId
        }, {
            $push: {
                reposters: userId
            }
        }).then(console.log(`[ 🔔 ] Новый репост от https://vk.com/id${userId}\n`))
    },
    addComment: (postId, userId) => {
        Repost.updateOne({
            postId: postId
        }, {
            $push: {
                commenters: userId
            }
        }).then(console.log(`[ 📢 ] Новый коммент от https://vk.com/id${userId}\n`))
    },
    offOldReposts: () => {
        return Repost.updateMany({ active: true }, { $set: { active: false }})
    },
    deleteBonuseForRepost: (postId) => {
        Repost.deleteOne({ postId }).then()
    },
}

module.exports = repost
