const { getUser } = require('../../database/managers/user')
const { profileBoardWithCallback, backToProfile } = require('../../keyboards/callback')
const { numberWithSpace } = require('../../settings/tools')
const { getLastBotMessage, messageEdit, vk } = require('../../settings/vk')

module.exports = dep = async (msg) =>  {
    const { eventId, userId, peerId } = msg

    const lastMessage = await getLastBotMessage(peerId)

    vk.api.messages.sendMessageEventAnswer({
        event_id: eventId,
        user_id: userId,
        peer_id: peerId
    })
    messageEdit({peer_id: peerId, message_id: lastMessage, message: `💰 Пополнение\n\nℹ Для пополнения баланса @diceys(Кубиками) переведите любую сумму на этот аккаунт https://vk.com/id297789589\n\n👇🏻 Ниже прикреплена статья, как это сделать.`, keyboard: backToProfile(true)})
}
