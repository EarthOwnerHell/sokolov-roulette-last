const like = require("../../../database/managers/like")
const repost = require("../../../database/managers/repost")
const { dbUserStat } = require("../../../database/managers/user")
const { numberWithSpace } = require("../../../tools")
const { vkHelp } = require("../../vk")

module.exports = async (msg) => {
    const { likerId, subTypes, objectId, objectType } = msg
    
    if (objectType !== 'post') return;

    let likePost = await like.get(objectId)
    
    const bonuseForRepost = await repost.get(objectId)

    let amountForLike = 25

    if (!likePost) {
        likePost = await like.add(objectId)
    };

    if (!bonuseForRepost?.active) {
        amountForLike = amountForLike / 4
    };

    if (likePost.likers.includes(likerId) && subTypes[0] === 'like_add') return vkHelp.msg({
        peer_id: likerId,
        message: `🔥 Круто! Мы ценим твои лайки, но мы даем награду за 1 лайк на пост\n\n😎 Не расстраивайся, лайкай другие посты :)`
    })
    
    if (likePost.likers.includes(likerId)) return 
    
    if (subTypes[0] === 'like_add') {
        
        like.addLiker(objectId, likerId);
        
        vkHelp.msg({
            peer_id: likerId,
            message: `❤ Вы получили ${numberWithSpace(amountForLike)} $ за лайк`
        })
    
        dbUserStat.plus(likerId, amountForLike, 'balancesInfo.main')
        console.log(`\n[ 🔔 ] Лайк от: https://vk.com/id${likerId}`)
    } 
    
    if (likePost.likers.includes(likerId)) {
        vkHelp.msg({
            peer_id: likerId,
            message: `💔 Вы разочаровали нас, мы снимаем ${numberWithSpace(amountForLike)} $`
        })
    
        dbUserStat.minus(likerId, amountForLike, 'balancesInfo.main')
        console.log(`\n[ 🔔 ] Удалил лайк: https://vk.com/id${likerId}`)
    }
}
