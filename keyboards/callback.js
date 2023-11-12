const { Keyboard } = require('vk-io')
const { colors, callBack, textButton, urlButton } = require('./methods')

const profileBoardWithCallback = Keyboard.keyboard([
    [
        callBack("📊 Моя статистика", "myStats", colors.red)
    ],
    [
        textButton('🎁 Промокод', 'promo', colors.blue)
    ],
    [
        urlButton('💰 Пополнить', "t.me/diceysbot/app?startapp=x297789589"),
        callBack('💸 Вывести', 'withdraw', colors.green),
    ]
]).inline()

const backToProfile = (commandIsDep) => Keyboard.keyboard([
    [
        callBack("⏪ Назад", "profile", colors.green)
    ],
    commandIsDep ? 
    [
        urlButton(`📎 «Как пополнить баланс 🎲»`, 'https://vk.com/sokolov_roulette')
    ] : []

]).inline()

module.exports = { profileBoardWithCallback, backToProfile }
