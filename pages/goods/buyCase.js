const dbGlobal = require("../../database/managers/global");
const { dbUser, dbUserStat } = require("../../database/managers/user");
const { vkHelp } = require('../../settings/vk.js');
const { getRandomNumber, lakingMoney, getRandomInRange } = require("../../tools");

const checkDiscount = (privilege, price) => privilege >= 2 ? price - (price * 0.1) : price


module.exports = async (msg) => {

    const casesController = {
        game: {
            price: 99_999,
            winValues: [
                {
                    number: getRandomInRange(45_000, 75_000),
                    winPercent: 60,
                },
                {
                    number: getRandomInRange(80_000, 110_000),
                    winPercent: 30,
                },
                {
                    number: getRandomInRange(130_000, 195_000),
                    winPercent: 10,
                },
            ]
        },
        sea: {
            price: 249_999,
            winValues: [
                {
                    number: getRandomInRange(200_000, 220_000),
                    winPercent: 60,
                },
                {
                    number: getRandomInRange(230_000, 265_000),
                    winPercent: 30,
                },
                {
                    number: getRandomInRange(280_000, 390_000),
                    winPercent: 10,
                },
            ]
        },
        radioactive: {
            price: 499_999,
            winValues: [
                {
                    number: getRandomInRange(450_000, 485_000),
                    winPercent: 60,
                },
                {
                    number: getRandomInRange(475_000, 520_000),
                    winPercent: 30,
                },
                {
                    number: getRandomInRange(565_000, 690_000),
                    winPercent: 10,
                },
            ]
        }, 
        witcher: {
            price: 799_999,
            winValues: [
                {
                    number: getRandomInRange(750_000, 775_000),
                    winPercent: 60,
                },
                {
                    number: getRandomInRange(780_000, 820_000),
                    winPercent: 30,
                },
                {
                    number: getRandomInRange(850_000, 965_000),
                    winPercent: 10,
                },
            ]
        },
        angry: {
            price: 999_999,
            winValues: [
                {
                    number: getRandomInRange(950_000, 985_000),
                    winPercent: 60,
                },
                {
                    number: getRandomInRange(980_000, 1_040_000),
                    winPercent: 30,
                },
                {
                    number: getRandomInRange(1_050_000, 1_300_000),
                    winPercent: 10,
                },
            ]
        },
    };

    const sendAnswer = (text) => vkHelp.sendEventAnswer({ peer_id: msg.userId, user_id: msg.userId, event_id: msg.eventId, text_event_data: text })

    const choosenCase = msg.eventPayload?.command

    const { price, winValues } = casesController[choosenCase]
    
    const { balancesInfo: { main }, privilegeLvL, nickname } = await dbUser.get(msg.userId, { balancesInfo: 1, privilegeLvL: 1, nickname: 1 });

    const priceWithDiscount = checkDiscount(privilegeLvL, price)
    
    if (main < priceWithDiscount) {
        vkHelp.sendEventAnswer({
            event_id: msg.eventId,
            user_id: msg.userId,
            peer_id: msg.peerId,
        })
        
        return vkHelp.msg(await lakingMoney(msg.userId, price - main))
    }
    
    const winAmount = getRandomNumber(winValues)

    await dbUserStat.minus(msg.userId, priceWithDiscount, 'balancesInfo.main');
    await dbUserStat.plus(msg.userId, winAmount, 'balancesInfo.main');
    
    sendAnswer(`💰 ${privilegeLvL ? nickname : await vkHelp.getName(msg.userId)}, вы выиграли ${winAmount} $!`)
}
