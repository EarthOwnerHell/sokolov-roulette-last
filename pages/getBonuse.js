const { dbUserStat, dbUser } = require("../database/managers/user")




module.exports = async (msg) => {

    const { lastEarnBonusePrivilege, privilegeLvL } = await dbUser.get(msg.senderId, { lastEarnBonusePrivilege: 1, privilegeLvL: 1 })
    
    if (Date.now() - lastEarnBonusePrivilege < 86_400_000) return msg.send('💔 24 часа еще не прошло.')

    const privilegesBonuses = {
        1: () => [dbUserStat.plus(msg.senderId, 100_000, 'balancesInfo.main')],
        2: () => [msg.send('👑 На этой привилегии нету ежедневного бонуса :(')],
        3: () => [dbUserStat.plus(msg.senderId, 150_000, 'balancesInfo.main')]
    }

    if (privilegeLvL !== 2) {
        msg.send('💙 Выдали бонус привилегии')
    }

    Promise.all([...privilegesBonuses[privilegeLvL](), dbUser.setLastEarnPrivilegeBonuse(msg.senderId)])

}
