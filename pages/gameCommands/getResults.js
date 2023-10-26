const bet = require("../../database/managers/bet");
const game = require("../../database/managers/game");
const { numberWithSpace } = require("../../settings/tools");
const { getVkNameById, vkHelp } = require("../../settings/vk");
const { gamePayloadsTranslate } = require("./gameTools");

const getWinnersAndLoosers = {
    'l7m' : async (data) => {
        const { results: { number }, peerId } = data
        let textToReturn = ''
        const gameId = await game.getGameId(peerId)
        const bets = await bet.getBets(gameId)
        for (let i = 0; i < bets.length; i++){
            const bet = bets[i]
            const userId = bet.userId
            const userName = await getVkNameById(userId)
            const userBetAmount = bet.betAmount
            const userBetType = bet.betType
            console.log(userBetType)
            if (userBetType == 'less' && number < 7 || userBetType == 'more' && number > 7 || userBetType == 'seven' && number == 7){
                textToReturn += `✅ @id${userId}(${userName}) - ставка ${numberWithSpace(userBetAmount.toFixed(0))} 🎲 на ${gamePayloadsTranslate[userBetType][1]} выиграла! (+${numberWithSpace((userBetAmount * gamePayloadsTranslate[userBetType][3]).toFixed(0))}) 🎲\n`
            }
            else if (userBetType == 'more' || userBetType == 'seven' && number < 7) textToReturn += `❌ @id${userId}(${userName}) - ставка ${numberWithSpace(userBetAmount.toFixed(0))} 🎲 на ${gamePayloadsTranslate[userBetType][1]} проиграла!\n\n`
            else if (userBetType == 'less' || userBetType == 'seven' && number > 7) textToReturn += `❌ @id${userId}(${userName}) - ставка ${numberWithSpace(userBetAmount.toFixed(0))} 🎲 на ${gamePayloadsTranslate[userBetType][1]} проиграла!\n\n`

        }
        return textToReturn
    }
}

function checkResults() {
    setTimeout(async function() {
    let gameId = ''
    const games = await game.getGames();
    for (let i = 0; i < games.length; i++) {
        const round = games[i]
        const thisGame = await game.getGame(round.peerId);
        if (thisGame?.endTime && Date.now() - thisGame?.endTime >= 0) {
        const { peerId, results: { number }, hash, hashKey, gameMode } = thisGame;
        gameId = await game.getGameId(peerId)
        const ggg = getWinnersAndLoosers[gameMode]
        const textWithPlayers = await ggg(thisGame);

        const finalText = `🔥 Раунд подошёл к концу!\nВыпало: ${number}\n\n` + textWithPlayers;
    
        const changeStatus = await game.changeGameStatus(gameId)

        vkHelp({
            peer_id: peerId,
            message: finalText,
        });

        }
        }

    setTimeout(checkResults, 100);
    }, 1_000);
    }
    checkResults()
    
    module.exports = checkResults 