const game = require("../../database/managers/game");

module.exports = () => {
    setTimeout(async function checkResults() {
        const games = await game.getGames()

        for (let game in games) {
            const round = await game.getGame(game.peerId)
            if (round?.endTime && Date.now() - round?.endTime >= 0 ) {
                const { peerId, results: { color, number }, hash, hashKey } = round

                //const [winners, lousers] = await Promise.all([getWinners({ winNumber: winNumber, winColor: winColor, bets: bets }), getLousers({ winNumber: winNumber, winColor: winColor, bets: bets })])

                //const resultText = `🔥 Раунд подошёл к концу!\nВыпало: число ${numbersToEmoji(winNumber)}, цвет: ${beautifulColors[winColor]}${winners}${lousers}\n🎁 Бонусы: https://vk.cc/cceG96`

                /*vkHelp.msg({
                    peer_id: chatId,
                    message: resultText,
                    keyboard: honestyMenu(hash, true, secretWord),
                    attachment: `photo${gamePhotos[winNumber]}`
                })*/

                //deleteGameFromList(chatId)
            }
        }

        setTimeout(checkResults, 100)
    }, 1_000)
}