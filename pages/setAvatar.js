const { dbUser } = require("../database/managers/user")
const { vkHelp } = require("../settings/vk")

const profileMenu = require("../keyboards/inline/profileMenu")
const { getColorStorage, getEarnedMoney, numberWithSpace, getEarnedRubs } = require("../tools")
const avatarsPhotos = require('../settings/photos/profileAvatars.json')
const dbGlobal = require("../database/managers/global")

const privilegeLvLs = {
    0: 'Игрок',
    1: 'Premium',
    2: 'VIP',
    3: 'Admin',
}

module.exports = async (msg) => {

    const { command } = msg.eventPayload

    dbUser.setAvatar(msg.userId, Number(command))

    vkHelp.sendEventAnswer({
        peer_id: msg.peerId,
        event_id: msg.eventId,
        user_id: msg.userId,
        text_event_data: '✅ Вы успешно выбрали персонажа.'
    })

    const { balancesInfo: { main, invest }, refs: { count }, qiwi, lastGetEarn, privilegeLvL, nickname, avatar } = await dbUser.get(msg.userId, { balancesInfo: 1, refs: 1, qiwi: 1, lastGetEarn: 1, privilegeLvL: 1, nickname: 1, avatar: 1 })

    const earned = getEarnedMoney(lastGetEarn, invest, privilegeLvL)

    const { depCourse, hackPercent } = await dbGlobal.get()

    const canWithdraw = getEarnedRubs(lastGetEarn, invest, privilegeLvL, hackPercent, depCourse)

    const colorStorage = getColorStorage(earned, privilegeLvL)

    const phone = qiwi ? qiwi : '❗ Не указан'

    const maxAccumulated = privilegeLvL !== 3 ? 1_000_000 : 2_000_000

    vkHelp.messageEdit({ 
        peer_id: msg.userId, 
        message_id: await vkHelp.getLastBotMessage(msg.userId), 
        message: `⚙ ${privilegeLvL ? nickname : await vkHelp.getName(msg.userId)}, ваш профиль:\n\n👤 Ваша привилегия: ${privilegeLvLs[privilegeLvL]} \n\n💵 Баланс: ${numberWithSpace(main)} $\n🔗 Привлечены: ${numberWithSpace(count)} рефералов\n\n💰 Суточный доход: ${numberWithSpace(invest)} $\n\n⚡ Можно вывести: ${numberWithSpace(canWithdraw)}₽\n\n📱 Номер: ${phone}\n\n${colorStorage} На складе:\n${numberWithSpace(Math.floor(earned))} из ${numberWithSpace(maxAccumulated)} $`,
        keyboard: profileMenu(privilegeLvL),
        attachment: avatarsPhotos[avatar] ? `photo${avatarsPhotos[avatar]}` : ''
    })

}
