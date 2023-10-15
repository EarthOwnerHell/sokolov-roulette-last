const { dbUserStat, dbUser } = require("../../../database/managers/user");
const activityMenu = require("../../../keyboards/inline/activityMenu");
const { formClick } = require("../../../tools");
const { vkHelp } = require("../../vk");



module.exports = async (msg) => {

    const { userId, subTypes: [ type ] } = msg;

    const user = await dbUser.get(userId, { id: 1, sub: 1 })
    
    if (!user) return

    const { id, sub } = user;
    
    if (type === 'group_join') {
        vkHelp.msg({
            peer_id: userId,
            message: '✅ Вау! Спасибо за подписку!)\n🎁 Ты получаешь бонус: 50.000$.',
            keyboard: activityMenu()
        })
        
        dbUser.setSub(userId)
        dbUserStat.plus(userId, 50_000, 'balancesInfo.main')
    } else {
        if (sub) {
            vkHelp.msg({
            peer_id: id,
            message: `🥺 ${await vkHelp.getName(id)}, ты отписался от нашего ${formClick(process.env.GROUP_ID, 'сообщества', true)} и потерял 50.000$\n\n😉 Чтобы вернуть их, подпишись\nна нас обратно. Мы ждём тебя ❤\n\n🎯 Если тебе не хватало Долларов,\nто выполняй задания тут 👇`,
            keyboard: activityMenu()
        })

        dbUser.setSub(userId, 0)
        dbUserStat.minus(id, 50_000, 'balancesInfo.main')
        }
    }

}
