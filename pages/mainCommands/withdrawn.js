const { vk } = require('../../settings/vk')
const {  numberWithSpace } = require("../../settings/tools")
const { sendCubes, whatReserve } = require ("../../settings/vkdice")
const { minusBalanceUser, plusWithdrawnCubes } = require("../../database/managers/user")
module.exports = withdrawnCubes = async (msg) => {

    const { id, balance } = msg.user
    const { eventId, userId, peerId } = msg 
    const reserve = await whatReserve()
    if (balance <= 0) return msg.send('😥 Увы, но мы не можем вывести вам пустой баланс')
    if (balance > reserve) return msg.send('❗ Приносим свои извинения, но на данный момент у нас не хватает резерва для вывода, подождите, пожалуйста.')
    sendCubes(id, balance)
    minusBalanceUser(id, balance)
    plusWithdrawnCubes(id, balance)
        vk.api.messages.sendMessageEventAnswer({
        event_id: eventId,
        user_id: userId,
        peer_id: peerId,
        event_data: JSON.stringify({
            'type': 'show_snackbar',
            'text': `✅ Успешно вывели ${numberWithSpace(balance)} 🎲, ждём вас снова!`
        })
    })
}
