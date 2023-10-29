const { getUser } = require('../../database/managers/user')
const { inlineProfileBoard, inlineProfileBoardPrivilege } = require('../../keyboards/inline')
const { numberWithSpace } = require('../../settings/tools')
const parsePhoneNumber = require('libphonenumber-js')

module.exports = balance = async (msg) => {
    const { name, balance, id, bonuseBalance } = await getUser(msg.senderId)
    return msg.send(`💰 @id${id}(${name}), твой баланс: ${numberWithSpace(balance.toFixed(0))} 🎲\n\n🎁 Бонусный баланс: ${numberWithSpace(bonuseBalance.toFixed(0))} 🎲`)

}
