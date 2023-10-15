const { keyboard, urlButton } = require("../helpers")

module.exports = (reviews = false) => keyboard([
    [
        urlButton({
            label: '🔥 Больше бонусов',
            url: 'https://vk.com/topic-210860036_48443058'
        }),
    ],
    reviews ? [
        urlButton({
            label: '⭐ Оставить отзыв'  ,
            url: 'https://vk.com/topic-210860036_48442816'
        }),
    ] : []
]).inline() 