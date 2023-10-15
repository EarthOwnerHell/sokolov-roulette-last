const honestyMenu = require("../../keyboards/inline/honestyMenu");
const createGame = require("./helpers/createGame")

const { vkHelp } = require("../../settings/vk");
const { numberWithSpace, convertMsToSec, numbersToEmoji, formClick } = require("../../tools");
const { getGame } = require("./helpers/gameInfo")

module.exports = async (msg) => {

    const noBettings = (hash) => {
        vkHelp.msg({ peer_id: msg.peerId, message: '💵 Ставки:\n\nПохоже, ещё никто не\nсделал ставку…', keyboard: honestyMenu(hash, false) })

        vkHelp.sendEventAnswer({
            peer_id: msg.peerId,
            user_id: msg?.userId,
            event_id: msg.eventId,
        })
    }

    const game = getGame(msg.peerId)

    if (!game) {
        const hash = createGame({ chatId: msg.peerId });

        return noBettings(hash)
    }

    const { bets, hash, endTime } = game;

    if (!Object.values(bets).length) return noBettings(hash)

    vkHelp.sendEventAnswer({
        peer_id: msg.peerId,
        user_id: msg.userId,
        event_id: msg.eventId
    })

    /* 
        Вид ставки:
            number: {
                value: null,
                amount: null
            },
            color: {
                value: null,
                amount: null
            },
            diaposon: {
                value: null,
                amount: null
            },
    
    */

    const betValues = {
        'betRed': {
            text: '🔴 На красное поставили:\n\n',
            countBets: 0,
        },
        'betBlack': {
            text: '⚫ На черное поставили:\n\n',
            countBets: 0
        },
        'betEven': {
            text: '🔶 На четное поставили:\n\n',
            countBets: 0
        },
        'betOdd': {
            text: '🔷 На нечетное поставили:\n\n',
            countBets: 0
        },
        'betOnFirstDiaposon': {
            text: '1️⃣ - 1️⃣2️⃣ На 1-12 поставили:\n\n',
            countBets: 0
        },
        'betOnSecondDiaposon': {
            text: '1️⃣3️⃣ - 2️⃣4️⃣ На 13-24 поставили:\n\n',
            countBets: 0
        },
        'betOnThirdDiaposon': {
            text: '2️⃣5️⃣ - 3️⃣6️⃣ На 25-36 поставили:\n\n',
            countBets: 0,
        },
        'betOnNumber': {
            text: '🔢 На число поставили:\n\n',
            countBets: 0
        }
    }

    let textBank = `💵 Ставки:\n\n`

    for (let userId in bets) {
        const { number, color, diaposon, typeNumber } = bets[userId]

        if (number?.value) {
            betValues['betOnNumber'].text += `${formClick(userId, await vkHelp.getName(userId))} ➜ ${numberWithSpace(number.amount)} $ на ${numbersToEmoji(number.value)}\n`
            betValues['betOnNumber'].countBets++
        }

        if (typeNumber?.value) {
            betValues[typeNumber.value].text += `${formClick(userId, await vkHelp.getName(userId))} ➜ ${numberWithSpace(typeNumber.amount)} $\n`
            betValues[typeNumber.value].countBets++
        }

        if (color?.value) {
            betValues[color.value].text += `${formClick(userId, await vkHelp.getName(userId))} ➜ ${numberWithSpace(color.amount)} $\n`
            betValues[color.value].countBets++
        }

        if (diaposon?.value) {
            betValues[diaposon.value].text += `${formClick(userId, await vkHelp.getName(userId))} ➜ ${numberWithSpace(diaposon.amount)} $\n`
            betValues[diaposon.value].countBets++
        }
    }

    for (let key in betValues) {
        const { countBets, text } = betValues[key]

        if (countBets) textBank += `${text}\n`;
    }

    textBank += `⌛ До конца раунда: ${convertMsToSec(endTime - Date.now())} сек.`;

    vkHelp.msg({
        peer_id: msg.peerId,
        message: textBank,
        keyboard: honestyMenu(hash, false)
    })
}
