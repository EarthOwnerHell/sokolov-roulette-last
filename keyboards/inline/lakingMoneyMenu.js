const { urlButton, keyboard } = require("../helpers");




module.exports = (amount) => (
    keyboard([
        urlButton({
            label: '🔗 Быстрое пополнение',
            url: `https://vk.com/app6887721_-${process.env.GROUP_ID}#donate_${Math.ceil(amount)}`
        })
    ]).inline()
)