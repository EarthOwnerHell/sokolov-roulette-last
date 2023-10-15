const { vkHelp } = require("../../../settings/vk")
const { getGame } = require("./gameInfo")




module.exports = (msg) => {
    const { hash } = msg.eventPayload || msg.messagePayload

    return vkHelp.sendEventAnswer({
        peer_id: msg.peerId,
        event_id: msg.eventId,
        user_id: msg.userId,
        text_event_data: `#️⃣ Хеш игры: ${hash}`
    })
}