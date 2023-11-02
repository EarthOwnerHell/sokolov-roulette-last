const getProfile = require('../pages/mainCommands/profile')
const stats = require('../pages/mainCommands/stats')
const chooseGame = require('../pages/gameCommands/chooseGame')
const tops = require('../pages/mainCommands/tops')
const ref = require('../pages/mainCommands/ref')
const inDeveloping = require('../pages/adminCommands/inDeveloping')
const myStats = require('../pages/callbackCommands/myStats')
const getTops = require('../pages/inlineCommands/top')
const shop = require('../pages/mainCommands/shop')
const promoUse = require('../pages/mainCommands/promo')

module.exports = userManager = async (msg) => {
    commands = {
        profile: () => getProfile(msg),
        getBonus: () => getBonus(msg),
        myStats: () => myStats(msg),
        inDeveloping: () => inDeveloping(msg), 
        games: () => chooseGame(msg),
        ref: () => ref(msg),
        changeQiwi: () => changeQiwi(msg),
        play: () => play(msg),
        stats: () => stats(msg),
        tops: () => tops(msg),
        shop: () => shop(msg),
        promo: () => promoUse(msg),
        dayTop: () => getTops(msg, 'dayTop'),
        weekTop: () => getTops(msg, 'weekTop'),
    }

    try {
        console.log(msg, commands[msg.messagePayload.command])
        commands[msg.messagePayload.command]()
    } catch (e) { console.log('--> Не нажали на кнопку User Manager\'a') }

}
