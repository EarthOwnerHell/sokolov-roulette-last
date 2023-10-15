const { dbUser, dbUserStat } = require("../../database/managers/user");
const { vkHelp } = require("../../settings/vk");

const { getGame, addBetToGame, checkBetUserValueInBets } = require('./helpers/gameInfo.js')

const createGame = require('./helpers/createGame.js')

const createBetOnNumber = async ({
    amountBet,
    msg,
    game
}) => {
    let numberForBet = await msg.question('🔢 Введите число:')

    numberForBet = Number(numberForBet.text)

    if (!numberForBet) return msg.send('❗ Вы ввели невалидные данные!\n❗ Попробуйте еще раз.')

    numberForBet = Math.floor(numberForBet);

    if (numberForBet < 1 || numberForBet > 36) return msg.send('❗ Вы ввели невалидные данные!\n❗ Попробуйте еще раз.')

    const checkUserValueForBet = checkBetUserValueInBets({ peerId: msg.peerId, userId: msg.senderId, betValue: numberForBet, betType: msg.messagePayload.betType });

    if (!checkUserValueForBet) return msg.send('⛔ Ты уже поставил на противоположный результат!')

    dbUserStat.minus(msg.senderId, amountBet, 'balancesInfo.main');

    msg.send(`✅ ${await vkHelp.getName(msg.senderId)}, приняли вашу ставку`);
    
        const doubleCheckGame = getGame(msg.peerId)

    if (!doubleCheckGame) {
        createGame({ chatId: msg.peerId })
    }

    addBetToGame({
        peerId: msg.peerId,
        userId: msg.senderId,
        betType: msg.messagePayload.betType,
        betValue: numberForBet,
        betAmount: amountBet,
    })
}

module.exports = async (msg) => {
    const { balancesInfo: { main }} = await dbUser.get(msg.senderId, { balancesInfo: 1, });

    const game = getGame(msg.peerId)

    if (!game) {
        createGame({ chatId: msg.peerId })
    }

    if (game?.endTime && game?.endTime - Date.now() < 3_000) return msg.send('⌛ До конца игры осталось 3 секунды, поставь в следующей.'); 

    if (main < 1) return msg.send('😨 У тебя на балансе меньше 1 $');

    let betAmount = await msg.question('🧾 Введите сумму ставки:');

    betAmount = Number(betAmount.text);

    if (betAmount < 1 || betAmount >= main || !betAmount) return msg.send('❗ Вы ввели невалидные данные!\n❗ Попробуйте еще раз.');

    if (msg.messagePayload.betType === 'number') return createBetOnNumber({ amountBet: betAmount, msg: msg, game: game })

    const checkUserValueForBet = checkBetUserValueInBets({ peerId: msg.peerId, userId: msg.senderId, betValue: msg.messagePayload.command, betType: msg.messagePayload.betType });

    if (!checkUserValueForBet) return msg.send('⛔ Ты уже поставил на противоположный результат!')

    dbUserStat.minus(msg.senderId, betAmount, 'balancesInfo.main');

    msg.send(`✅ ${await vkHelp.getName(msg.senderId)}, приняли вашу ставку`);
    
        const doubleCheckGame = getGame(msg.peerId)

    if (!doubleCheckGame) {
        createGame({ chatId: msg.peerId })
    }

    addBetToGame({
        peerId: msg.peerId,
        userId: msg.senderId,
        betType: msg.messagePayload.betType,
        betValue: msg.messagePayload.command,
        betAmount: betAmount,
    })
}
