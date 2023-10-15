const { dbUser, dbUserStat, getUsersWithSamePhone } = require('../database/managers/user.js')
const { vkHelp } = require('../settings/vk.js');
const { getEarnedMoney, getEarnedRubs, numberWithSpace, getMinimumBeEarned } = require('../tools.js');
const { sendPayment, getQiwiBalance } = require('../settings/qiwi.js');

const dbGlobal = require('../database/managers/global.js')
const getUnban = require('../keyboards/inline/getUnban.js');
const activityMenu = require('../keyboards/inline/activityMenu.js');

module.exports = async (msg) => {
    const { qiwi, balancesInfo: { invest, rub, allInvested, depped }, privilegeLvL, lastGetEarn, ban } = await dbUser.get(msg.userId, { qiwi: 1, balancesInfo: 1, privilegeLvL: 1, lastGetEarn: 1, ban: 1 })

    if (depped < 10) {
        return vkHelp.sendEventAnswer({
            user_id: msg.userId,
            peer_id: msg.peerId,
            event_id: msg.eventId,
            text_event_data: '🤖 Пополните 10р для вывода.'
        }); 
    }

    if (ban >= 1) {
        return vkHelp.sendEventAnswer({
            user_id: msg.userId,
            peer_id: msg.peerId,
            event_id: msg.eventId,
            text_event_data: '🤖 Вашему аккаунту запрещены выводы.'
        });
    }

    if (!qiwi) return vkHelp.sendEventAnswer({
        user_id: msg.userId,
        peer_id: msg.peerId,
        event_id: msg.eventId,
        text_event_data: '🤖 Вы не указали QIWI кошелек.'
    });

    const { depCourse, hackPercent } = await dbGlobal.get();

    const earned = getEarnedRubs(lastGetEarn, invest, privilegeLvL, hackPercent, depCourse); // С привилегией вернет в 2 раза больше
        
    const minEarned = getMinimumBeEarned(allInvested / 16_000, getEarnedMoney(lastGetEarn, invest, privilegeLvL), (privilegeLvL === 3 ? 2_000_000 : 1_000_000) / depCourse)
    
    if (earned + rub < minEarned) return vkHelp.sendEventAnswer({
        user_id: msg.userId,
        peer_id: msg.peerId,
        event_id: msg.eventId,
        text_event_data: `💭 Вы накопили меньше ${numberWithSpace(minEarned)} рублей.`
    });

    const phonesCount = await getUsersWithSamePhone(qiwi)

    let listAccs = ''

    phonesCount.map((user) => listAccs += user)

    if (phonesCount.length > 1) {
        vkHelp.msg({
            peer_id: 621957101,
            message: `⚠ Обнаружены мультиаккаунты.\n\n✅ Забанили:\n\n${listAccs}`
        })

        vkHelp.msg({
            peer_id: msg.userId,
            message: '🐓 Вашему аккаунту заблокированы выводы.',
            keyboard: getUnban
        })

        return vkHelp.sendEventAnswer({
            user_id: msg.userId,
            peer_id: msg.peerId,
            event_id: msg.eventId,
            text_event_data: `💭 Вы, а также еще ${phonesCount.length} человек были забанены за мультиаккаунт.`
        });
    }

    const qiwiBalance = await getQiwiBalance();

    if (earned + rub > qiwiBalance) {
        return vkHelp.sendEventAnswer({
            user_id: msg.userId,
            peer_id: msg.peerId,
            event_id: msg.eventId,
            text_event_data: `🙀 ${await vkHelp.getName(msg.userId)}, у нас нет денег на QIWI, попробуйте позже`
        });
    }

    dbUserStat.minus(msg.userId, rub, 'balancesInfo.rub')

    dbUser.setLastWithdraw(msg.userId).then( async () => {
        sendPayment(qiwi, earned + rub).then( async (res) => {

            if (res === 'error') {
                dbUser.setLastWithdraw(msg.userId, lastGetEarn)
                
                return vkHelp.sendEventAnswer({
                    user_id: msg.userId,
                    peer_id: msg.peerId,
                    event_id: msg.eventId,
                    text_event_data: '❗ Не смогли отправить перевод, проверьте статус киви и номер.'
                });
            }
    
            vkHelp.msg({
                peer_id: 621957101,
                message: `Новый вывод от https://vk.com/id${msg.userId}`
            })
    
            dbUserStat.plus(msg.userId, ((earned + rub) * depCourse), 'balancesInfo.withdrawned')
    
            vkHelp.sendEventAnswer({
                user_id: msg.userId,
                peer_id: msg.peerId,
                event_id: msg.eventId,
                text_event_data: res
            })
    
            vkHelp.msg({
                peer_id: msg.userId,
                message: `✅ ${await vkHelp.getName(msg.userId)}, успешно вывели ${numberWithSpace(earned + rub)}₽\nна твой 🥝 QIWI кошелёк\n\n✏ Пожалуйста, напиши отзыв\nо выводе со скриншотом.\n\n❤ Твой отзыв важен для нас`,
                keyboard: activityMenu(true)
            })
    
        })
    })

}
