const repost = require("../../../database/managers/repost");
const { dbUserStat } = require("../../../database/managers/user");
const activityMenu = require("../../../keyboards/inline/activityMenu");
const { vkHelp } = require("../../vk")

module.exports = async (msg) => {

    if (msg.subTypes[0] !== 'wall_repost') return;

    const repostInfo = await repost.get(msg.wall.copyHistory[0].id)
    const userId = msg.wall.ownerId

    if (!repostInfo || !repostInfo.active) return;

    if (repostInfo?.reposters.includes(userId)) return;

    vkHelp.msg({
        peer_id: userId,
        message: `❤ Спасибо за репост!\n🤑Мы начислили тебе 50.000$\n\n🎯 Выполняй задания и получай\nещё больше Долларов 👇`,
        keyboard: activityMenu()
    })

    dbUserStat.plus(userId, repostInfo.bonuseAmount, 'balancesInfo.main')
    repost.addReposter(msg.wall.copyHistory[0].id, userId)
}
