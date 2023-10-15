const privilegesMenu = require("../../keyboards/inline/privilegesMenu")
const { privileges } = require('../../settings/photos/privilege.json')

const { dbUser } = require("../../database/managers/user")
const { vkHelp } = require("../../settings/vk")


module.exports = async (msg) => {
    const { privilegeLvL, nickname } = await dbUser.get(msg.senderId, { privilegeLvL: 1, nickname: 1 })

    msg.send(`🎩 ${privilegeLvL ? nickname : await vkHelp.getName(msg.senderId)}, привилегии`, {
        keyboard: await privilegesMenu(privilegeLvL, msg.senderId),
        attachment: `photo${privileges}`
    })

}