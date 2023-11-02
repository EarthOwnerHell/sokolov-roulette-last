const groupsCarousel = JSON.stringify({
    "type": "carousel",
    "elements": [
        {
            "title": "🎰 Wheel",
            "description": "⚡ Классическая рулетка, числа от 1-36, два цвета.",
            "photo_id": "-210769620_457240419",
            "buttons": [
                {
                    "action": {
                        "type": "open_link",
                        "label": "🎮 Играть",
                        "link": "https://vk.com/id297789589"
                    }
                }
            ]
        },
        {
            "title": "🟣 Double",
            "description": "⚡ Игра, в которой нужно угадать коэффициент. Ставка умножается на него!",
            "photo_id": "-210769620_457240419",
            "buttons": [
                {
                    "action": {
                        "type": "open_link",
                        "label": "🎮 Играть",
                        "link": "https://vk.com/id297789589"
                    }
                }
            ]
        },
        {
            "title": "🎲 Cube",
            "description": "⚡ Нужно угадать число от 1 до 6, коэффициент на каждое X5.",
            "photo_id": "-210769620_457240419",
            "buttons": [
                {
                    "action": {
                        "type": "open_link",
                        "label": "🎮 Играть",
                        "link": "https://vk.com/id297789589"
                    }
                }
            ]
        },
        {
            "title": "⭐ Dice",
            "description": "⚡ Практически такая же рулетка, только числа от 1 до 12!",
            "photo_id": "-210769620_457240419",
            "buttons": [
                {
                    "action": {
                        "type": "open_link",
                        "label": "🎮 Играть",
                        "link": "https://vk.com/id297789589"
                    }
                }
            ]
        },
        {
            "title": "🔥 L7B",
            "description": "⚡ Игра, в которой нужно угадать, больше/меньше 7 или выпадет 7.",
            "photo_id": "-210769620_457240419",
            "buttons": [
                {
                    "action": {
                        "type": "open_link",
                        "label": "🎮 Играть",
                        "link": "https://vk.com/id297789589"
                    }
                }
            ]
        }
    ]
});

const shopCarousel = JSON.stringify({
    "type": "carousel",
    "elements": [
        {
            "title": "👤 Привилегии",
            "description": "⚡ Покупай привилегию и получай выгодные бонусы!",
            "photo_id": "-210769620_457240419",
            "buttons": [
                {
                    "action": {
                        "type": "callback",
                        "label": "⭐ Привилегии",
                        "payload" : {
                            "command" : "privileges"
                        }
                    }
                }
            ]
        },
        {
            "title": "💶 Купить бонусный баланс",
            "description": "⚡ Купи 🎲 по более выгодной цене!",
            "photo_id": "-210769620_457240419",
            "buttons": [
                {
                    "action": {
                        "type": "callback",
                        "label": "💸 Купить баланс",
                        "payload" : {
                            "command" : "buyBonuseBalance"
                        }
                    }
                }
            ]
        }
    ]
});

module.exports = { groupsCarousel, shopCarousel }