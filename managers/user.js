const getProfile = require('../pages/mainCommands/profile')
const stats = require('../pages/mainCommands/stats')
const chooseGame = require('../pages/gameCommands/chooseGame')
const tops = require('../pages/mainCommands/tops')
const ref = require('../pages/mainCommands/ref')
const inDeveloping = require('../pages/adminCommands/inDeveloping')
const myStats = require('../pages/inlineCommands/myStats')
const shop = require('../pages/mainCommands/shop')
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
        promo: () => promo(msg),
        dayTop: () => getTops(msg, 'winPerToday'),
        weekTop: () => getTops(msg, 'winPerWeek'),
    }

    try {
        commands[msg.messagePayload.command]()
    } catch (e) { console.log(msg.messagePayload.command + commands[msg.messagePayload.command] + '--> Не нажали на кнопку User Manager\'a') }

}
