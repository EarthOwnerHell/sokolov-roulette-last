const comment = require("../../../database/managers/comment")
const repost = require("../../../database/managers/repost")
const { dbUserStat } = require("../../../database/managers/user")
const { vkHelp } = require("../../vk")

module.exports = async (msg) => {
    const { fromId, subTypes, objectId } = msg

    let post = await comment.get(objectId);

    const bonuseForRepost = await repost.get(objectId)

    let amountForComment = 40

    if (!post) {
        post = await comment.add(objectId)
    };

    if (!bonuseForRepost?.active) {
        amountForComment = amountForComment / 4
    }

    comment.addComment(objectId, fromId);

    if (post.comments.filter(x => x === fromId).length >= 250) return vkHelp.msg({
        peer_id: fromId,
        message: `🔥 Круто! Мы ценим твою активность, но ты достиг дневного лимита по комментариям…\n\n😎 Не расстраивайся, пиши комменты под следующим бонусом за репост`
    })

    if (subTypes[1] === 'wall_reply_new') {

        vkHelp.msg({
            peer_id: fromId,
            message: `📝 Вы получили ${amountForComment}$ за комментарий`
        })
    
        dbUserStat.plus(fromId, amountForComment, 'balancesInfo.main')
        console.log(`\n[ 📝 ] Оставил комментарий: https://vk.com/id${fromId}`)
    } else {
        vkHelp.msg({
            peer_id: msg.deleterUserId,
            message: `💔 Мы разочарованы, мы сняли с вашего баланса ${amountForComment}$`
        })

        console.log(`\n[ 📝 ] Удалил комментарий: https://vk.com/id${msg.deleterUserId}`)
        dbUserStat.minus(msg.deleterUserId, amountForComment, 'balancesInfo.main')
    }
}
