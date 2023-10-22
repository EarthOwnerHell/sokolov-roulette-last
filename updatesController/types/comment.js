const comment = require("../../database/managers/comment");
const repost = require("../../database/managers/repost");
const { plusBalanceUser } = require("../../database/managers/user");
const { vkHelp } = require("../../settings/vk");

module.exports = async (msg) => {
    const { fromId, subTypes, objectId } = msg
    const type = subTypes[1]

    let post = await comment.get(objectId);

    const bonuseForRepost = await repost.get(objectId)

    let amountForComment = 500

    if (!post) {
        post = await comment.add(objectId)
    };

    if (!bonuseForRepost?.active) {
        amountForComment = amountForComment / 4
    }

    comment.addComment(objectId, fromId);

    if (post.comments.filter(x => x === fromId).length >= 150) return vkHelp({
        peer_id: fromId,
        message: `💭 Мы ценим твою активность, но ты достиг лимита по комментариям на этой записи.\n\n⚡ Это не страшно, в группе точно есть и другие посты! `
    })

    if (type === 'wall_reply_new') {
        vkHelp({
            peer_id: fromId,
            message: `✉ Спасибо за комментарий!\n\n🤑 На ваш баланс начислено ${amountForComment} 🎲`
        })
        plusBalanceUser(msg.fromId, amountForComment);
      
    } 
    if (type === 'wall_reply_delete'){
        vkHelp({
            peer_id: msg.deleterUserId,
            message: `🥺 Вы убрали комментарий, снимаем с вашего баланса${amountForComment} 🎲`
        })
        minusBalanceUser(msg.deleterUserId, amountForComment);
        console.log(`\n[ 📝 ] Удалил комментарий: https://vk.com/id${msg.deleterUserId}`)
    }
}
