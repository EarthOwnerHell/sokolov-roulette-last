const { vk, questionManager, getId } = require('../../settings/vk')
const { numberWithSpace } = require('../../settings/tools')
const { getGlobal, editWinToday, editLossToday } = require('../../database/managers/global')

vk.updates.use(questionManager.middleware)

module.exports = async (msg) => {
    const { winToday, lossToday } = await getGlobal()
    console.log(winToday, lossToday)
    editWinToday(-winToday)
    editLossToday(-lossToday)
    return msg.send(`На данный момент:\n\nВыиграно: ${numberWithSpace(winToday.toFixed(0))}\nПроиграно: ${numberWithSpace(lossToday.toFixed(0))}\n\nИтог: ${numberWithSpace((winToday - lossToday).toFixed(0))}`)
}
