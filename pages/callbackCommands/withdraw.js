const { vk, vkHelp, sendEventAnswer } = require('../../settings/vk')
const {  numberWithSpace } = require("../../settings/tools")
const { sendCubes, whatReserve } = require ("../../settings/vkdice")
const { minusBalanceUser, plusWithdrawnCubes, getUser } = require("../../database/managers/user")
module.exports = withdrawnCubes = async (msg) => {
    const { id, balance } = await getUser(msg.userId)
    const reserve = await whatReserve()
    if (balance <= 0) {
        return sendEventAnswer(msg, '❗Нельзя вывести пустой баланс', 'show_snackbar')
    }
    if (balance > reserve.balance){
        return sendEventAnswer(msg, '❗Сейчас не хватает резерва для вывода этой суммы, попробуйте вывести позже', 'show_snackbar')
    }
    sendCubes(id, balance)
    minusBalanceUser(id, balance)
    plusWithdrawnCubes(id, balance)
    return sendEventAnswer(msg, `✅ Успешно вывели ${numberWithSpace(balance.toFixed(0))} 🎲, ждём вас снова!`, 'show_snackbar')
}
