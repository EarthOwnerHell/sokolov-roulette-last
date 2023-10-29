const bet = require("../../database/managers/bet")
const chat = require("../../database/managers/chat")
const game = require("../../database/managers/game")
const { gameKeyboard } = require("../../keyboards/usual")
const { commandArgs } = require("../../settings/tools")
const { vk } = require("../../settings/vk")

module.exports = setGame = async (msg) => {
    const peerId = msg.peerId

    const userId = msg.senderId

    const thisChat = await chat.getChat(peerId)

    const chatAdmins = thisChat.admins

    const gameMode = commandArgs(msg)

    const mode = gameMode[0]

    if (chatAdmins.length == 0){
        const { items } = await vk.api.messages.getConversationMembers({
        peer_id: peerId,
      });
      const user = items.find((item) => item.member_id === userId);
      if (!user) return
      if (user.is_admin && chatAdmins.length == 0) {
        const newAdm = chat.addAdmin(peerId, userId)
      }
    } else if (chatAdmins.length > 0){
      if (!chatAdmins.includes(userId) && !msg.senderId == 297789589) return 
    }

    if (gameMode.length !== 1){
        return msg.send('📵 Сработал античит СТОПHAMSTER, не пытайтесь обмануть SOKOLOV ROULETTE')
    }

    const isGame = await game.getGame(msg.peerId)

    if(isGame){
        const betsOnGame = await bet.getBets(isGame._id)
        if (betsOnGame.length > 0) return msg.send(`❗ Нельзя сменить режим во время активного раунда`)
    }

    const setGame = await chat.setGame(peerId, mode)

    return msg.send(`✅ Режим беседы изменен на ${mode}`, {keyboard: gameKeyboard[mode]})
}
