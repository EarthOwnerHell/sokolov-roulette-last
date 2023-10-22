const { getDep, newDep } = require('../database/manager/dep')
const { vkMsg, vkMsgForPrivileges } = require('./vk')
const { numberWithSpace, formClick } = require('../settings/tools')
const { getUser, plusRubBalanceUser, plusBalanceUser } = require('../database/manager/user')
const { getGlobal } = require('../database/manager/global')
const { mainBoard } = require('../keyboards/usual')
const user = require('../managers/user')

module.exports = newDonate = async (id, userId, amount, op) => {

    const dep = await getDep(id) 

    if (dep) return

    const { ref: { refferer }, buyPrivilegeStatus } = await getUser(userId)

    const forRefferer = await getUser(refferer)
    const { buyCourse } = await getGlobal()

    const sumForRefferer = amount * forRefferer.ref.value < 10 ? 0.03
        : forRefferer.ref.value < 20 ? 0.04
            : forRefferer.ref.value < 30 ? 0.05
                : forRefferer.ref.value < 40 ? 0.06
                    : 0.07

    const addDep = await newDep({ id: Number(id), userId: Number(userId), sum: Number(amount) })

    vkMsg(
        userId,
        `✅ Успешное пополнение [ ${numberWithSpace(
            amount
        )}₽ ] !\n\n🤑 Начислено [ ${numberWithSpace(amount * buyCourse)} $ ]`, 'photo-209099203_457272396'
    );
    vkMsg(forRefferer.id, `🎉 Ваш ${formClick(userId, 'реферал')} пополнил баланс.\n\n🎁 Вам начислено ${numberWithSpace(amount * sumForRefferer)} рубля`)
    vkMsg(621957101, `${formClick(userId, 'Пользователь')} пополнил на ${numberWithSpace(amount)} рублей и получил ${numberWithSpace(amount * 160000)} 🎲\n\nЕго ${formClick(forRefferer.id, 'Рефферер')} получил 🎲{numberWithSpace(amount * sumForRefferer)} рублей`)

    plusRubBalanceUser(forRefferer.id, amount * sumForRefferer)
    plusBalanceUser(Number(userId), Number(amount * buyCourse));


}
