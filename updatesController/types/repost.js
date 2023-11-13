const repost = require("../../database/managers/repost");
const { plusBalanceUser } = require("../../database/managers/user");
const { numberWithSpace } = require("../../settings/tools");
const { vkHelp } = require("../../settings/vk")

module.exports = async (msg) => {
    if (msg.subTypes[0] !== 'wall_repost') return

    const repostInfo = await repost.get(msg.wall.copyHistory[0].id)
    const userId = msg.wall.ownerId

    if (!repostInfo || !repostInfo.active) return;

    if (repostInfo?.reposters.includes(userId)) return;

    vkHelp({
        peer_id: userId,
        message: `📣 Спасибо за репост!\n\n💰На ваш баланс начислено ${numberWithSpace(repostInfo.bonuseAmount)} 🎲`
    })
    plusBalanceUser(userId, repostInfo.bonuseAmount)
    repost.addReposter(msg.wall.copyHistory[0].id, userId)
}
