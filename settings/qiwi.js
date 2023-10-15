const Qiwi = require('node-qiwi')
const QIWI = require("@qiwi/bill-payments-node-js-sdk");
const { numberWithSpace } = require('../tools')

const wallet = new Qiwi(process.env.QIWI_TOKEN)

const qiwi = new QIWI(process.env.QIWI_SECRET)

const createPayment = async (amount, comment) => {
    const QIWISettings = {
        amount: amount,
        billId: qiwi.generateId(),
        comment: comment,
        currency: "RUB",
        successUrl: 'https://vk.me/inc_venom_investing'
    };

    const { payUrl } = await qiwi.createBill(QIWISettings.billId, QIWISettings)

    return payUrl
}

const getQiwiBalance = async () => {
    const res = await wallet.getBalance()

    return res[0].balance.amount.toFixed(0)
}

const sendPayment = async (phone, amount) => {
    try {
        wallet.sendPayment(amount, phone, '👑 Вывод из «CASH BANGER»')

        return `Успешно вывели ${numberWithSpace(amount)} рублей`;
    } catch (e) {
        return 'error'
    }
}

module.exports = { sendPayment, createPayment, getQiwiBalance }
