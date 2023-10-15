const { dbUserStat } = require("../../database/managers/user")
const { againGiveBalanceMenu, amounts } = require("../../keyboards/inline/againGiveBalanceMenu")
const { vkHelp } = require("../../settings/vk")
const { numberWithSpace } = require("../../tools")


module.exports = async (msg) => {

    let userLink = await msg.question('Отправь ссылку на чела')

    const user = await vkHelp.getIdByLink(userLink.text)
    
    if (!user.id) return msg.send('бля иди нахуй, го норм ссылку')

    const balanceAmount = await msg.question('Введи баланс для выдачи, что бы снять напиши перед число минус. Пример: 1000000 ; -1000000', {
        keyboard: amounts
    })

    if (!Number(balanceAmount.text)) return msg.send('число надо')

    if (Number(balanceAmount.text) <= 0) {
        dbUserStat.minus(user.id, -Number(balanceAmount.text), 'balancesInfo.main')
    } else {
        dbUserStat.plus(user.id, Number(balanceAmount.text), 'balancesInfo.main')
    }

    vkHelp.msg({
        peer_id: user.id,
        message: `🤭 Воу! Тебе выдали ${numberWithSpace(Number(balanceAmount.text))}$ !\n😉 Пора прикупить новый бизнес`
    })

    msg.send('Успешно', {
        keyboard: againGiveBalanceMenu
    })
}
