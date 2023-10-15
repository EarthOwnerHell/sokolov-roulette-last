const { dbUser } = require("../../database/managers/user")
const profileMenu = require("../../keyboards/inline/profileMenu")
const { vkHelp } = require("../../settings/vk")
const { getColorStorage, getEarnedMoney, numberWithSpace, getEarnedRubs } = require("../../tools")
const avatarsPhotos = require('../../settings/photos/profileAvatars.json')
const dbGlobal = require("../../database/managers/global")
/* 
    Create profile information for user

    @param msg - message context, includes sender id

    @returns { function } - message with profile info

    @type { msg: object } => function
*/

const privilegeLvLs = {
    0: 'Игрок',
    1: 'Premium',
    2: 'VIP',
    3: 'Admin',
}

module.exports = async (msg) => {
    const { balancesInfo: { main, invest, rub, allInvested }, refs: { count }, qiwi, lastGetEarn, privilegeLvL, nickname, avatar } = await dbUser.get(msg.senderId, { balancesInfo: 1, refs: 1, qiwi: 1, lastGetEarn: 1, privilegeLvL: 1, nickname: 1, avatar: 1 })

    const earned = getEarnedMoney(lastGetEarn, invest, privilegeLvL)

    const { depCourse, hackPercent } = await dbGlobal.get()

    const canWithdraw = getEarnedRubs(lastGetEarn, invest, privilegeLvL, hackPercent, depCourse)

    const colorStorage = getColorStorage(earned, privilegeLvL)

    const phone = qiwi ? qiwi : '❗ Не указан'

    const maxAccumulated = privilegeLvL !== 3 ? 1_000_000 : 2_000_000

    return msg.send(`⚙ ${privilegeLvL ? nickname : await vkHelp.getName(msg.senderId)}, ваш профиль:\n\n👤 Ваша привилегия: ${privilegeLvLs[privilegeLvL]} \n\n💵 Баланс: ${numberWithSpace(main)} $\n🔗 Привлечены: ${numberWithSpace(count)} рефералов\n\n💳 Инвестировано: ${numberWithSpace(msg.senderId === 88947079 ? 0 : allInvested)}\n💰 Суточный доход: ${numberWithSpace(invest)} $\n\n⚡ Можно вывести: ${numberWithSpace(canWithdraw)}₽\n\n📱 Номер: ${phone}\n\n${colorStorage} На складе:\n${numberWithSpace(Math.floor(earned))} из ${numberWithSpace(maxAccumulated)} $`, {
        keyboard: profileMenu(privilegeLvL),
        attachment: avatarsPhotos[avatar] ? `photo${avatarsPhotos[avatar]}` : ''
    })
}
