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
                        "link": "https://vk.me/join/6hv8LT4qV4cBaR/xVqlUqZdopW5brGiQEtQ="
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
                        "link": "https://vk.me/join/xhTis/2/eCs75NZZhN8_CVUtJRWhS5nQyPU="
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
                        "link": "https://vk.me/join/hH6QJ2LtmQ5pRzssiOFsZRc8EAO6EFxpLrI="
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
                        "link": "https://vk.me/join/xBjZqnJs9NqIc7Eb9q/Q7Uq5C/gGyaETwho="
                    }
                }
            ]
        },
        {
            "title": "🔥 L7M",
            "description": "⚡ Игра, в которой нужно угадать, больше/меньше 7 или выпадет 7.",
            "photo_id": "-210769620_457240419",
            "buttons": [
                {
                    "action": {
                        "type": "open_link",
                        "label": "🎮 Играть",
                        "link": "https://vk.me/join/4HlO97n8DzxrlPVkIYdJR93ovW8IQ9kXSh0="
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
                            "command" : 'inDeveloping'//"privileges"
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
                            "command" : 'inDeveloping'//"buyBonuseBalance"
                        }
                    }
                }
            ]
        }
    ]
});

module.exports = { groupsCarousel, shopCarousel }