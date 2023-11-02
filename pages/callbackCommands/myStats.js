const { getUser } = require('../../database/managers/user')
const { backToProfile } = require('../../keyboards/callback')
const { numberWithSpace } = require('../../settings/tools')
const { getLastBotMessage, messageEdit, vk, vkHelp } = require('../../settings/vk')

module.exports = myStats = async (msg) =>  {
    const { winCubes, withdrawnCubes, deppedCubes, id } = await getUser(msg.userId)

    const { eventId, userId, peerId } = msg

    const lastMessage = await getLastBotMessage(peerId)

    vk.api.messages.sendMessageEventAnswer({
        event_id: eventId,
        user_id: userId,
        peer_id: peerId
    })
    return messageEdit({peer_id: peerId, message_id: lastMessage, message: `🍀 Вы выиграли за всё время: ${numberWithSpace(winCubes.toFixed(0))} 🎲\n———\n💰 Вы пополнили: ${numberWithSpace(deppedCubes.toFixed(0))} 🎲\n———\n🎲 Вы вывели: ${numberWithSpace(withdrawnCubes.toFixed(0))} 🎲`, keyboard: backToProfile})

}
