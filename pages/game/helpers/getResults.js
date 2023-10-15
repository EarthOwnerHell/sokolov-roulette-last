const { dbUserStat } = require("../../../database/managers/user")
const { vkHelp } = require("../../../settings/vk")
const { numberWithSpace, numbersToEmoji } = require("../../../tools")
const { getGames, getGame, deleteGameFromList } = require("./gameInfo")

const honestyMenu = require("../../../keyboards/inline/honestyMenu")

const gamePhotos = require('../../../settings/photos/game.json')

const getWinDiaposon = (winNumber) => {
    if (winNumber === 0) return null

    if (winNumber >= 1 && winNumber <= 12) return 'betOnFirstDiaposon'

    if (winNumber >= 13 && winNumber <= 24) return 'betOnSecondDiaposon'

    if (winNumber >= 25 && winNumber <= 36) return 'betOnThirdDiaposon'
}

const checkWinOnTypeNumber = (winNumber) => winNumber % 2 === 0 ? 'betEven' : 'betOdd'

const colorTypes = {
    'red': 'betRed',
    'black': 'betBlack'
}

const translateBetOnRussian = {
    'betRed': 'красное',
    'betBlack': 'черное',
    'betOnFirstDiaposon': '1-12',
    'betOnSecondDiaposon': '13-24',
    'betOnThirdDiaposon': '25-36',
    'betEven': 'четное',
    'betOdd': 'нечетное'
}

const getUserWinText = async (userId, betAmount, factorBet, winValue) => {
    dbUserStat.plus(userId, betAmount * factorBet, 'balancesInfo.main')

    return `✅ ${await vkHelp.getName(userId)} ставка ${numberWithSpace(betAmount)} $ на ${typeof winValue === 'number' ? numbersToEmoji(winValue) : translateBetOnRussian[winValue]} выиграла!\n`
}

const getUserLoseText = async (userId, betAmount, factorBet, winValue) => {
    return `❌ ${await vkHelp.getName(userId)} ставка ${numberWithSpace(betAmount)} $ на ${typeof winValue === 'number' ? numbersToEmoji(winValue) : translateBetOnRussian[winValue]} проиграла!\n`
}

const getWinners = async ({ winNumber, winColor, bets }) => {
    if (winNumber === 0) return ``;
    
    let winnersText = `\n\n😎 Победители:\n`

    for (let key in bets) {
        const { number, color, diaposon, typeNumber } = bets[key]

        if (number.value === winNumber) winnersText += await getUserWinText(key, number.amount, 35, number.value)

        if (color.value === colorTypes[winColor]) winnersText += await getUserWinText(key, color.amount, 1.9, color.value)

        const winDiaposon = getWinDiaposon(winNumber);

        if (diaposon.value === winDiaposon) winnersText += await getUserWinText(key, diaposon.amount, 2.9, diaposon.value)

        if (typeNumber.value === checkWinOnTypeNumber(winNumber)) winnersText += await getUserWinText(key, typeNumber.amount, 1.9, typeNumber.value)
    }
    
    return winnersText
}

const getLousers = async ({ winNumber, winColor, bets }) => {
    let lousersText = `\n\n😭 Проигравшие:\n`

    for (let key in bets) {
        const { number, color, diaposon, typeNumber } = bets[key]

        if (number.value !== winNumber && number.value) lousersText += await getUserLoseText(key, number.amount, 35, number.value)

        if (color.value !== colorTypes[winColor] && color.value) lousersText += await getUserLoseText(key, color.amount, 1.9, color.value)

        const winDiaposon = getWinDiaposon(winNumber);

        if (diaposon.value !== winDiaposon && diaposon.value) lousersText += await getUserLoseText(key, diaposon.amount, 2.9, diaposon.value)

        if (typeNumber.value !== checkWinOnTypeNumber(winNumber) && typeNumber.value) lousersText += await getUserLoseText(key, typeNumber.amount, 1.9, typeNumber.value)
    }
    
    return lousersText
}

const beautifulColors = {
    'red': '🔴',
    'black': '⚫',
    'green': '🟢',
}

module.exports = () => {
    setTimeout(async function checkResults() {
        const games = getGames()

        for (let game in games) {
            const round = getGame(games[game].chatId);

            if (round?.endTime && Date.now() - round?.endTime >= 0 ) {
                const { chatId, winNumber, winColor, hash, secretWord, bets } = round

                const [winners, lousers] = await Promise.all([getWinners({ winNumber: winNumber, winColor: winColor, bets: bets }), getLousers({ winNumber: winNumber, winColor: winColor, bets: bets })])

                const resultText = `🔥 Раунд подошёл к концу!\nВыпало: число ${numbersToEmoji(winNumber)}, цвет: ${beautifulColors[winColor]}${winners}${lousers}\n🎁 Бонусы: https://vk.cc/cceG96`

                vkHelp.msg({
                    peer_id: chatId,
                    message: resultText,
                    keyboard: honestyMenu(hash, true, secretWord),
                    attachment: `photo${gamePhotos[winNumber]}`
                })

                deleteGameFromList(chatId)
            }
        }

        setTimeout(checkResults, 100)
    }, 1_000)
}
