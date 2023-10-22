const chat = require("../../database/managers/chat")
const { gameKeyboard } = require("../../keyboards/usual")
const { commandArgs } = require("../../settings/tools")

module.exports = setGame = async (msg) => {
    const gameMode = commandArgs(msg)
    const game = gameMode[0]
    if (gameMode.length !== 1){
        return msg.send('📵 Сработал античит СТОПHAMSTER, не пытайтесь обмануть SOKOLOV ROULETTE')
    }
    chat.setGame(msg.peerId, game)
    return msg.send(`✅ Режим беседы изменен на ${game}`, {keyboard: gameKeyboard[game]})
}
