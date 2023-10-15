const topsMenu = require("../../keyboards/inline/topsMenu");

const { getCountUsersByOption, getAllEarningsInGame, getAllInvestInGame, dbUser } = require("../../database/managers/user");
const { numberWithSpace } = require("../../tools");
const { vkHelp } = require("../../settings/vk");

/* 
    Sending info about bot

    @param msg - message context, includes sender id

    @returns { function } - message with profile info

    @type { msg: object } => function
*/

module.exports = async (msg) => {
    const [
        countUsers, countRefs, 
        totalWithdrawAmount, 
        totalInvestAmount,
        userInfo,
        topsMenuCarousel
    ] = await Promise.all([getCountUsersByOption({}), getCountUsersByOption({ 'refs.referrer': { $gt: 0 }}), getAllEarningsInGame(), getAllInvestInGame(), dbUser.get(msg.senderId, { privilegeLvL: 1, nickname: 1 }), topsMenu(msg.senderId)])

    const allEarnings = totalWithdrawAmount

    const { privilegeLvL, nickname } = userInfo

    const allInvested = totalInvestAmount

    const allEarningsInRub = Math.floor(allEarnings / 16_000);

    return msg.send(`🖥 ${privilegeLvL ? nickname : await vkHelp.getName(msg.senderId)}, наша статистика:\n\n🔗 Пользователей: ${numberWithSpace(countUsers)}\n🤝 Всего рефералов: ${numberWithSpace(countRefs)}\n\n💳 Всего вложено: ${numberWithSpace(allInvested)} $\n\n💵 Всего заработано: ${numberWithSpace(allEarnings)} $\n🤑 Всего выведено: ${numberWithSpace(allEarningsInRub)}₽`, {
        template: topsMenuCarousel 
    })
}
