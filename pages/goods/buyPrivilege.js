const dbGlobal = require("../../database/managers/global");
const { dbUser, dbUserStat } = require("../../database/managers/user");
const { vkHelp } = require("../../settings/vk")

module.exports = async (privilege, userId, amount) => {
    const [ { depCourse }, { privilegeLvL: userPrivilegeLvL, nickname } ] = await Promise.all([ dbGlobal.get(), dbUser.get(userId, { privilegeLvL: 1, nickname: 1 }) ])

    const privilegeInfo = {
        vip: {
            price: 299,
            lvl: 1
        },
        premium: {
            price: 499,
            lvl: 2
        },
        admin: {
            price: 999,
            lvl: 3
        }
    } 

    const privilegeLvL = privilegeInfo[privilege]?.lvl
    const privilegePrice = privilegeInfo[privilege]?.price

    if (privilegePrice > Number(amount) || !privilegeLvL) {
        vkHelp.msg({
            peer_id: userId,
            message: '⚙ Произошла ошибка при оплате, зачислили деньги на ваш баланс.'
        })

        return dbUserStat.plus(userId, amount * depCourse, 'balancesInfo.main')
    }

    vkHelp.msg({
        peer_id: userId,
        message: `👑 ${userPrivilegeLvL ? nickname : await vkHelp.getName(userId)}, ты успешно приобрёл привилегию «${privilege.toUpperCase()}» !!!\n\n😎 Все функции работают автоматически!\nПолучение ежедневного бонуса можно найти во вкладке 🖥 Профиль`
    })

    dbUser.setPrivilege(userId, privilegeLvL);
}
