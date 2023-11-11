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

    if (balance >= 100_000_000){
        vkHelp({peer_id: 297789589, message: `Заявка на вывод:\n\n@id${id}(Пользователь) - ${numberWithSpace(balance)} кубиков`})

        return sendEventAnswer(msg, '❗Такие большие выводы проводятся только через администрацию, ваша заявка уже на рассмотрении, пожалуйста, не нажимайте на кнопку вывод много раз, администрация уже оповещена о заявке', 'show_snackbar')
    }

    const forPush = balance

    await sendCubes(id, balance)

    await minusBalanceUser(id, balance)

    await plusWithdrawnCubes(id, balance)

    sendEventAnswer(msg, `✅ Успешно вывели ${numberWithSpace(balance.toFixed(0))} 🎲, ждём вас снова!`, 'show_snackbar')

    const balanceAfterWithdraw = await whatReserve()
    
    return vkHelp({peer_id: 297789589, message: `@id${id}(Пользователь) выводит ${numberWithSpace(forPush.toFixed(0))} кубиков\n\nРезерв казино: ${numberWithSpace(balanceAfterWithdraw.toFixed(0))}`})
}