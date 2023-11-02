const { Keyboard } = require('vk-io')
const { colors, callBack, textButton } = require('./methods')

const profileBoardWithCallback = Keyboard.keyboard([
    [
        callBack("📊 Моя статистика", "myStats", colors.red)
    ],
    [
        textButton('🎁 Промокод', 'promo', colors.blue)
    ],
    [
        callBack('💰 Пополнить', 'dep', colors.green),
        callBack('💸 Вывести', 'withdraw', colors.green),
    ]
]).inline()

const backToProfile = Keyboard.keyboard([
    [
        callBack("⏪ Назад", "profile", colors.green)
    ],
]).inline()

module.exports = { profileBoardWithCallback, backToProfile }