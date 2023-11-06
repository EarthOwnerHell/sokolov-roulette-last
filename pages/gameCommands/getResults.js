const bet = require("../../database/managers/bet");
const game = require("../../database/managers/game");
const { editDayTopBudget, editWeekTopBudget } = require("../../database/managers/global");
const { plusBalanceUser, editWinPerDay, editWinPerWeek } = require("../../database/managers/user");
const { honestyCheck } = require("../../keyboards/inline");
const { numberWithSpace, convertSecToBeautySec } = require("../../settings/tools");
const { getVkNameById, vkHelp } = require("../../settings/vk");
const { gamePayloadsTranslate } = require("./gameTools");

const getWinnersAndLoosers = {
    'l7m' : async (data) => {
        const { results: { number }, peerId } = data
        let textToReturn = number != 7 ? `🎰 Выпало число ${number}\n\n` : `🎰 Выпало число ${number} 🔵\n\n`
        const gameId = await game.getGameId(peerId)
        const bets = await bet.getBets(gameId)
        let deductionsToTops = 0
        for (let i = 0; i < bets.length; i++){
            const bet = bets[i]
            const userId = bet.userId
            const userName = await getVkNameById(userId)
            const userBetAmount = bet.betAmount
            const userBetType = bet.betType
            if (userBetType == 'less' && number < 7 || userBetType == 'more' && number > 7 || userBetType == 'seven' && number == 7){
                const userWin = userBetAmount * gamePayloadsTranslate[userBetType][3].toFixed(0) 
                plusBalanceUser(userId, userWin)
                editWinPerDay(userId, userWin)
                editWinPerWeek(userId, userWin)
                editDayTopBudget(userWin * 0.05)
                editWeekTopBudget(userWin * 0.025)
                deductionsToTops += userWin * 0.075
                textToReturn += `✅ @id${userId}(${userName}) - ставка ${numberWithSpace(userBetAmount.toFixed(0))} 🎲 на ${gamePayloadsTranslate[userBetType][1]} выиграла! (+${numberWithSpace(userWin.toFixed(0))} 🎲)\n`
            }
           else textToReturn += `❌ @id${userId}(${userName}) - ставка ${numberWithSpace(userBetAmount.toFixed(0))} 🎲 на ${gamePayloadsTranslate[userBetType][1]} проиграла!\n`
        }
        return [textToReturn, deductionsToTops]
    },
    'wheel' : async(data) => {
        const { results: { number, color }, peerId } = data
        let textToReturn = `🎰 Выпало число ${number} ${gamePayloadsTranslate[color][0]}\n\n`
        const gameId = await game.getGameId(peerId)
        const bets = await bet.getBets(gameId)
        let deductionsToTops = 0
        for (let i = 0; i < bets.length; i++){
            const bet = bets[i]
            const userId = bet.userId
            const userName = await getVkNameById(userId)
            const userBetAmount = bet.betAmount
            const userBetType = bet.betType
            console.log(userBetType, number >= 1 && number <= 12)
            if ((userBetType == '1-12' && number >= 1 && number <= 12)  || (userBetType == '13-24' && number >= 13 && number <= 24)  || (userBetType == '25-36' && number >= 25 && number <= 36) || (userBetType == 'red' && color == 'red')  || (userBetType == 'black' && color == 'black') || (userBetType == 'odd' && number % 2 != 0) || (userBetType == 'even' && number % 2 == 0) || (userBetType == 'zero' && number == 0)){
                const userWin = userBetAmount * gamePayloadsTranslate[userBetType][3].toFixed(0) 
                plusBalanceUser(userId, userWin)
                editWinPerDay(userId, userWin)
                editWinPerWeek(userId, userWin)
                editDayTopBudget(userWin * 0.05)
                editWeekTopBudget(userWin * 0.025)
                deductionsToTops += userWin * 0.075
                textToReturn += `✅ @id${userId}(${userName}) - ставка ${numberWithSpace(userBetAmount.toFixed(0))} 🎲 на ${gamePayloadsTranslate[userBetType][1]} выиграла! (+${numberWithSpace(userWin.toFixed(0))} 🎲)\n`
            }
            else textToReturn += `❌ @id${userId}(${userName}) - ставка ${numberWithSpace(userBetAmount.toFixed(0))} 🎲 на ${gamePayloadsTranslate[userBetType][1]} проиграла!\n`
        }
        return [textToReturn, deductionsToTops]
    },
    'cube': async(data) => {
        const { results: { number }, peerId } = data
        let textToReturn = `🎰 Выпало число ${number}\n\n`
        const gameId = await game.getGameId(peerId)
        const bets = await bet.getBets(gameId)
        let deductionsToTops = 0
        for (let i = 0; i < bets.length; i++){
            const bet = bets[i]
            const userId = bet.userId
            const userName = await getVkNameById(userId)
            const userBetAmount = bet.betAmount
            const userBetType = bet.betType
            if ((userBetType == 'one' && number == 1)  || (userBetType == 'two' && number == 2)  || (userBetType == 'three' && number == 3) || (userBetType == 'four' && number == 4)  || (userBetType == 'five' && number == 5) || (userBetType == 'six' && number == 6) || (userBetType == 'odd' && number % 2 != 0) || (userBetType == 'even' && number % 2 == 0)){
                const userWin = userBetAmount * gamePayloadsTranslate[userBetType][3].toFixed(0) 
                plusBalanceUser(userId, userWin)
                editWinPerDay(userId, userWin)
                editWinPerWeek(userId, userWin)
                editDayTopBudget(userWin * 0.05)
                editWeekTopBudget(userWin * 0.025)
                deductionsToTops += userWin * 0.075
                textToReturn += `✅ @id${userId}(${userName}) - ставка ${numberWithSpace(userBetAmount.toFixed(0))} 🎲 на ${gamePayloadsTranslate[userBetType][1]} выиграла! (+${numberWithSpace(userWin.toFixed(0))} 🎲)\n`
            }
            else textToReturn += `❌ @id${userId}(${userName}) - ставка ${numberWithSpace(userBetAmount.toFixed(0))} 🎲 на ${gamePayloadsTranslate[userBetType][1]} проиграла!\n`
        }
        return [textToReturn, deductionsToTops]
    }, 
    'dice': async(data) => {
        const { results: { number, color }, peerId } = data
        let textToReturn = `🎰 Выпало ${Number(number) ? 'число ' : ''}${number} ${gamePayloadsTranslate[color][0]}\n\n`
        const gameId = await game.getGameId(peerId)
        const bets = await bet.getBets(gameId)
        let deductionsToTops = 0
        for (let i = 0; i < bets.length; i++){
            const bet = bets[i]
            const userId = bet.userId
            const userName = await getVkNameById(userId)
            const userBetAmount = bet.betAmount
            const userBetType = bet.betType
            if ((userBetType == '1-4' && number >= 1 && number <= 4)  || (userBetType == '5-8' && number >= 5 && number <= 8)  || (userBetType == '9-12' && number >= 9 && number <= 12) || (userBetType == 'black' && color == 'black')  || (userBetType == 'white' && color == 'white') || (userBetType == 'odd' && number % 2 != 0) || (userBetType == 'even' && number % 2 == 0) || (userBetType == 'golden' && number == 'Золото')){
                const userWin = userBetAmount * gamePayloadsTranslate[userBetType][3].toFixed(0) 
                plusBalanceUser(userId, userWin)
                editWinPerDay(userId, userWin)
                editWinPerWeek(userId, userWin)
                editDayTopBudget(userWin * 0.05)
                editWeekTopBudget(userWin * 0.025)
                deductionsToTops += userWin * 0.075
                textToReturn += `✅ @id${userId}(${userName}) - ставка ${numberWithSpace(userBetAmount.toFixed(0))} 🎲 на ${gamePayloadsTranslate[userBetType][1]} выиграла! (+${numberWithSpace(userWin.toFixed(0))} 🎲)\n`
            }
            else textToReturn += `❌ @id${userId}(${userName}) - ставка ${numberWithSpace(userBetAmount.toFixed(0))} 🎲 на ${gamePayloadsTranslate[userBetType][1]} проиграла!\n`
        }
        return [textToReturn, deductionsToTops]
    },
    'double': async(data) => {
        const { results: { coefficent }, peerId } = data
        let textToReturn = `🎰 Выпал коэффицент ${coefficent} ${gamePayloadsTranslate[coefficent][0]}\n\n`
        const gameId = await game.getGameId(peerId)
        const bets = await bet.getBets(gameId)
        let deductionsToTops = 0
        for (let i = 0; i < bets.length; i++){
            const bet = bets[i]
            const userId = bet.userId
            const userName = await getVkNameById(userId)
            const userBetAmount = bet.betAmount
            const userBetType = bet.betType
            if ((userBetType == '2X' && coefficent == userBetType)  || (userBetType == '3X' && coefficent == userBetType)  || (coefficent == '5X' && coefficent == userBetType) || (userBetType == '10X' && coefficent == userBetType)){
                const userWin = userBetAmount * gamePayloadsTranslate[userBetType][3].toFixed(0) 
                plusBalanceUser(userId, userWin)
                editWinPerDay(userId, userWin)
                editWinPerWeek(userId, userWin)
                editDayTopBudget(userWin * 0.05)
                editWeekTopBudget(userWin * 0.025)
                deductionsToTops += userWin * 0.075
                textToReturn += `✅ @id${userId}(${userName}) - ставка ${numberWithSpace(userBetAmount.toFixed(0))} 🎲 на ${gamePayloadsTranslate[userBetType][1]} выиграла! (+${numberWithSpace(userWin.toFixed(0))} 🎲)\n`
            }
            else textToReturn += `❌ @id${userId}(${userName}) - ставка ${numberWithSpace(userBetAmount.toFixed(0))} 🎲 на ${gamePayloadsTranslate[userBetType][1]} проиграла!\n`
        }
        return [textToReturn, deductionsToTops]
    }
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
        const { peerId, hash, hashKey, gameMode } = thisGame;
        const getRoundInfo = getWinnersAndLoosers[gameMode]
        const finalText = await getRoundInfo(thisGame);

        const changeStatus = await game.changeGameStatus(gameId)

        const deductionsToTop = `\n📊 Отчисления в топы: ${numberWithSpace(finalText[1].toFixed(0))}`

        vkHelp({
            peer_id: peerId,
            message: finalText[0] + `${finalText[1] > 0 ? deductionsToTop + ' 🎲' : ''}\n\n❓ Хэш игры: ${hash}\n🔑 Ключ к хэшу: ${hashKey}`,
            keyboard: honestyCheck
        });

        }
        }

    setTimeout(checkResults, 100);
    }, 1_000);
    }
    checkResults()
    
    module.exports = checkResults 