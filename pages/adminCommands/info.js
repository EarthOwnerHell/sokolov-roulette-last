const { vk, questionManager, getId } = require('../../settings/vk')
const { numberWithSpace } = require('../../settings/tools')
const { getGlobal } = require('../../database/managers/global')

vk.updates.use(questionManager.middleware)

module.exports = async (msg) => {
    const { winToday, lossToday } = await getGlobal()
    return msg.send(`На данный момент:\n\nВыиграно: ${numberWithSpace(winToday)}\nПроиграно: ${numberWithSpace(lossToday)}\n\nИтог: ${numberWithSpace(winToday - lossToday)}`)
}
