const chat = require("../../database/managers/chat")
const { gameKeyboard } = require("../../keyboards/usual")
const { commandArgs } = require("../../settings/tools")
const { vk } = require("../../settings/vk")

module.exports = setGame = async (msg) => {
    const peerId = msg.peerId

    const userId = msg.senderId

    const thisChat = await chat.getChat(peerId)

    const chatAdmins = thisChat.admins

    const gameMode = commandArgs(msg)

    const game = gameMode[0]

    if (chatAdmins.length == 0){
      console.log(chatAdmins)
        const { items } = await vk.api.messages.getConversationMembers({
        peer_id: peerId,
      });
      const user = items.find((item) => item.member_id === userId);
      console.log(items, user)
      if (!user) return
      if (user.is_admin && chatAdmins.length == 0) {
        const newAdm = chat.addAdmin(peerId, userId)
      }
    } else if (chatAdmins.length > 0){
      if (!chatAdmins.includes(userId)) return 
    }

    if (gameMode.length !== 1){
        return msg.send('📵 Сработал античит СТОПHAMSTER, не пытайтесь обмануть SOKOLOV ROULETTE')
    }

    const setGame = await chat.setGame(peerId, game)

    return msg.send(`✅ Режим беседы изменен на ${game}`, {keyboard: gameKeyboard[game]})
}
