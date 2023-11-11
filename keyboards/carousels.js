const groupsCarousel = JSON.stringify({
    "type": "carousel",
    "elements": [
        {
            "title": "🎰 Wheel",
            "description": "⚡ Классическая рулетка, числа от 1-36, два цвета.",
            "photo_id": "-210769620_457240443",
            "buttons": [
                {
                    "action": {
                        "type": "open_link",
                        "label": "🎮 Играть",
                        "link": "https://vk.me/join/uPelDCn_2Ywd9jlmU8Yhxtbe6til/RM9LlY="
                    }
                }
            ]
        },
        {
            "title": "🟣 Double",
            "description": "⚡ Игра, в которой нужно угадать коэффициент. Ставка умножается на него!",
            "photo_id": "-210769620_457240444",
            "buttons": [
                {
                    "action": {
                        "type": "open_link",
                        "label": "🎮 Играть",
                        "link": "https://vk.me/join/CG3PM1G2eiAPcBy/ozgWEvimLJxLCncbigk="
                    }
                }
            ]
        },
        {
            "title": "🎲 Cube",
            "description": "⚡ Нужно угадать число от 1 до 6, коэффициент на каждое X5.",
            "photo_id": "-210769620_457240445",
            "buttons": [
                {
                    "action": {
                        "type": "open_link",
                        "label": "🎮 Играть",
                        "link": "https://vk.me/join/0PrRwck50OtwXpehfKJpWDVQLUsA__/pc8A="
                    }
                }
            ]
        },
        {
            "title": "⭐ Dice",
            "description": "⚡ Практически такая же рулетка, только числа от 1 до 12!",
            "photo_id": "-210769620_457240446",
            "buttons": [
                {
                    "action": {
                        "type": "open_link",
                        "label": "🎮 Играть",
                        "link": "https://vk.me/join/GuOi8InkIh4D/AMbsVRTDzmtmVT2rODuDdA="
                    }
                }
            ]
        },
        {
            "title": "🔥 L7M",
            "description": "⚡ Игра, в которой нужно угадать, больше/меньше 7 или выпадет 7.",
            "photo_id": "-210769620_457240447",
            "buttons": [
                {
                    "action": {
                        "type": "open_link",
                        "label": "🎮 Играть",
                        "link": "https://vk.me/join/tYg2kIb_X_wmU2UttBsHuP9L2Fjh9XSwiO4="
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
            "photo_id": "-210769620_457240513",
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
            "photo_id": "-210769620_457240514",
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
