const { getUser } = require('../../database/managers/user')
const { inlineProfileBoard, inlineProfileBoardPrivilege } = require('../../keyboards/inline')
const { numberWithSpace } = require('../../settings/tools')
const parsePhoneNumber = require('libphonenumber-js')

module.exports = getProfile = async (msg) => {
    const { name, balance, bonuseBalance, id, ref:{ value }} = await getUser(msg.senderId)
    text = (`
👤 @id${id}(${name}), твой профиль:

🔗 Рефералов у вас: ${numberWithSpace(value)}
———

💰 Баланс: ${numberWithSpace(balance.toFixed(0))} 🎲
———

🎁 Бонусный баланс: ${numberWithSpace(bonuseBalance.toFixed(0))} 🎲`) 
    return msg.send(text, {keyboard: inlineProfileBoard})

}
