const { dbUser, dbUserStat } = require("../../database/managers/user");
const { vkHelp } = require("../../settings/vk");
const { lakingMoney } = require("../../tools");


const checkDiscount = (privilege, price) => privilege == 2 ? price - (price * 0.1) : price

module.exports = async (msg) => {

    const { userId } = msg;

    const { command } = msg.eventPayload

    // Возвращает балансы - invest, main, withdrawed, rub. main - Основной баланс для покупок
    const { balancesInfo: { main }, privilegeLvL, nickname, lastGetEarn } = await dbUser.get(userId, { balancesInfo: 1, privilegeLvL: 1, nickname: 1, lastGetEarn: 1 });

    const upgradesInfo = {
        buyFirstUpgrade: {
            price: 54_299,
            earn: 1_200,
        },
        buySecondUpgrade: {
            price: 114_499,
            earn: 2_800
        },
        buyThirdUpgrade: {
            price: 234_999,
            earn: 6_700
        },
        buyFourthUpgrade: {
            price: 417_999,
            earn: 13_500
        },
        buyFivthUpgrade: {
            price: 741_999,
            earn: 26_500
        },
        buySixUpgrade: {
            price: 999_999,
            earn: 41_000,
        },
    }

    const upgradePrice = checkDiscount(privilegeLvL, upgradesInfo[command].price)
    const upgradeEarn = upgradesInfo[command].earn

    if (upgradePrice > main) {
        vkHelp.sendEventAnswer({
            event_id: msg.eventId,
            user_id: userId,
            peer_id: msg.peerId,
        })

        return vkHelp.msg(await lakingMoney(userId, upgradePrice - main))
    }
    
    await dbUserStat.plus(userId, upgradePrice, 'balancesInfo.allInvested')
    await dbUserStat.minus(userId, upgradePrice, 'balancesInfo.main')
    await dbUserStat.plus(userId, upgradeEarn, 'balancesInfo.invest')

    vkHelp.sendEventAnswer({
        event_id: msg.eventId,
        user_id: userId,
        peer_id: msg.peerId,
        text_event_data: `✅ ${privilegeLvL ? nickname : await vkHelp.getName(userId)}, вы успешно купили бизнес`
    });
//     dbUser.setLastWithdraw(userId, lastGetEarn + 60000 * 60)
}
