const fastDepAndBonusesMenu = require("../../../keyboards/inline/fastDepAndBonusesMenu")

const { dbUser } = require("../../../database/managers/user")

const { vkHelp } = require('../../../settings/vk.js')

const { numbersToEmoji, formClick, numberWithSpace } = require("../../../tools")

/* 
    💰 Star, твой баланс:
⃣⃣.⃣⃣⃣ 💵

[💳 Пополнить] [🎁 Бонусы]
—
Star, твой баланс пуст…

Пополни или собери бонусы👇
[💳 Пополнить] [🎁 Бонусы] 
*/

module.exports = async (msg) => {
    const { balancesInfo: { main }, id, nickname } = await dbUser.get(msg.userId || msg.senderId, { balancesInfo: 1, id: 1, nickname: 1 })

    vkHelp.msg({
        peer_id: msg.peerId,
        message: `💰 ${formClick(id, nickname)}, ${main < 1 ? `твой баланс пуст...\n\nПополни или собери бонусы 👇` :  `твой баланс:\n${numbersToEmoji(numberWithSpace(main))} $`}`,
        keyboard: fastDepAndBonusesMenu
    })

    vkHelp.sendEventAnswer({
        event_id: msg.eventId,
        user_id: id,
        peer_id: msg.peerId
    })
}
