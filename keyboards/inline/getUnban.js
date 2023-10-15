const { keyboard, urlButton } = require("../helpers");




module.exports = keyboard([
    [
        urlButton({
            label: '🔓 Разбан',
            url: 'https://vk.com/topic-210860036_48442886'
        })
    ]
]).inline()