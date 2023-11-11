const bet = require("../../database/managers/bet");
const game = require("../../database/managers/game");
const { editDayTopBudget, editWeekTopBudget, editWinToday, editLossToday } = require("../../database/managers/global");
const { plusBalanceUser, editWinPerDay, editWinPerWeek, plusWinCubesAll } = require("../../database/managers/user");
const { honestyCheck } = require("../../keyboards/inline");
const { numberWithSpace } = require("../../settings/tools");
const { vkHelp, getChatLink } = require("../../settings/vk");
const { gamePayloadsTranslate, photoesDependMode } = require("./gameTools");

const getWinnersAndLoosers = async (data) => {
        const { results, _id, peerId, gameMode } = data

        const chatLink = await getChatLink(peerId)

        let deductionsToTops = 0

        let topDayBudgetToPlus = 0

        let topWeekBudgetToPlus = 0

        let statsForAdm = 0

        let loss = 0

        let win = 0

        const winCoombination = `${results.length != 5 ? results[0] : results[4]} ${gamePayloadsTranslate[results.length == 1 ? results[0] : results[1]][0]}`

        let textToReturn = `🎰 ${Number(results[0]) || results[0] == 0 && results.length < 5 ? `Выпало число ${winCoombination}` : results[0] == 0 && results.length == 5 ? `Выпало ${winCoombination}` : `Выпал коэффицент ${winCoombination}`}\n\n`;

        const bets = await bet.getBets(_id)

        for await (const userBet of bets){
            const userBetType = userBet.betType

            const userBetAmount = userBet.betAmount 

            const userId = userBet.userId

            const userName = userBet.userName

            if (!results.includes(userBet.betType)){
                textToReturn += `❌ @id${userId}(${userName}) - ставка ${numberWithSpace(userBetAmount.toFixed(0))} 🎲 на ${gamePayloadsTranslate[userBetType][1]} проиграла!\n`

                statsForAdm += Number(userBetAmount.toFixed(0))

                loss += userBetAmount.toFixed(0)

                continue
            }

            const userWin = userBetAmount * gamePayloadsTranslate[userBetType][3].toFixed(0) 

            await plusBalanceUser(userId, userWin)

            await editWinPerDay(userId, userWin)

            await editWinPerWeek(userId, userWin)

            await plusWinCubesAll(userId, userWin)

            deductionsToTops += userWin * 0.075

            topDayBudgetToPlus += userWin * 0.05

            topWeekBudgetToPlus += userWin * 0.025

            textToReturn += `✅ @id${userId}(${userName}) - ставка ${numberWithSpace(userBetAmount.toFixed(0))} 🎲 на ${gamePayloadsTranslate[userBetType][1]} выиграла! (+${numberWithSpace(userWin.toFixed(0))} 🎲)\n`
            
            statsForAdm -= Number(userWin.toFixed(0))

            win += userWin
        } 

        await editDayTopBudget(topDayBudgetToPlus)

        await editWeekTopBudget(topWeekBudgetToPlus)

        win != 0 ? await editWinToday(win) : loss != 0 ? await editLossToday(loss) : ''

        vkHelp({peer_id: 2000000263, message: `${textToReturn}\n\nРежим игры: ${gameMode}\nВ чате: ${chatLink}\n\nИтог: ${numberWithSpace(statsForAdm.toFixed(0))} кубиков`})

        return [textToReturn, deductionsToTops]
}

function checkResults() {
    setTimeout(async function() {
    let gameId = ''

    const games = await game.getGames();
    
    for (let i = 0; i < games.length; i++) {
        const round = games[i]

        const thisGame = await game.getGame(round.peerId);

        gameId = await game.getGameId(round.peerId)

        const bets = await bet.getBets(gameId)

        if (bets.length == 0) continue

        if (Date.now() - thisGame?.endTime >= -1_000 && Date.now() - thisGame?.endTime <= 0) vkHelp({peer_id: thisGame.peerId, message: '🔮 Раунд подходит к концу...'})

        if (thisGame?.endTime && Date.now() - thisGame?.endTime >= 0) {
        const { peerId, hash, hashKey, gameMode, results } = thisGame;

        const finalText = await getWinnersAndLoosers(thisGame);

        const changeStatus = await game.changeGameStatus(gameId)

        const deductionsToTop = `\n📊 Отчисления в топы: ${numberWithSpace(finalText[1].toFixed(0))}`
        
        vkHelp({
            peer_id: peerId,
            message: finalText[0] + `${finalText[1] > 0 ? deductionsToTop + ' 🎲' : ''}\n\n❓ Хэш игры: ${hash}\n🔑 Ключ к хэшу: ${hashKey}`,
            keyboard: honestyCheck,
            attachment: photoesDependMode[gameMode][results[0]] ? photoesDependMode[gameMode][results[0]] : photoesDependMode[gameMode][results[1]]
        });

        }
        }

    setTimeout(checkResults, 100);
    }, 1_000);
    }
    checkResults()
    
    module.exports = checkResults 
