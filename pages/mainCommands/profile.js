const { getUser } = require('../../database/managers/user')
const { inlineProfileBoard, inlineProfileBoardPrivilege } = require('../../keyboards/inline')
const { numberWithSpace } = require('../../settings/tools')
const parsePhoneNumber = require('libphonenumber-js')

module.exports = getProfile = async (msg) => {
    const { name, balance, bonuseBalance, id } = await getUser(msg.senderId)
    text = (`
👤 @id${id}(${name}), твой профиль:

🔗 Рефералов у вас:
———

💰 Баланс: ${balance}
———

🎁 Бонусный баланс: ${bonuseBalance}`)
    return msg.send(text, {keyboard: inlineProfileBoard})

}
