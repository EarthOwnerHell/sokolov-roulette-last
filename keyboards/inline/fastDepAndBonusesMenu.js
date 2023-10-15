const { keyboard, urlButton } = require("../helpers");




module.exports = keyboard([
    [
        urlButton({
            label: '💳 Пополнить',
            url: process.env.PAYMENT_LINK,
        })
    ],
    [
        urlButton({
            label: '🔥 Больше бонусов',
            url: 'https://vk.com/topic-210860036_48443058'
        }),
    ]
]).inline()