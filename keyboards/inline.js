const { Keyboard } = require('vk-io')
const { textButton, urlButton, colors } = require('./methods')
const inDeveloping = require('../pages/adminCommands/inDeveloping')
const { numberWithSpace } = require('../settings/tools')

const whatIsButton =  Keyboard.keyboard([
    [
        textButton('❔ Что такое Кубики? ', "whatIs", colors.blue)
    ]
]).inline()

/*const blackjackBet = (balance) => (
    Keyboard.keyboard([
    [
        textButton(`${numberWithSpace((balance / 10).toFixed(0))}`, 'firstVariant', green),
    ],
    [
        textButton(`${numberWithSpace((balance / 4).toFixed(0))}`, 'secondVariant', green)
    ],
    [
        textButton(`${numberWithSpace((balance / 2).toFixed(0))}`, "thitdVariant", green)
    ],
    [
        textButton(`${numberWithSpace((balance).toFixed(0))}`, 'fourthVariant', red),
    ],
]).inline())*/

const inlineProfileBoard = Keyboard.keyboard([
        [
            textButton("📊 Моя статистика", "myStats", colors.red)
        ],
        [
            textButton('🎁 Промокод', 'promo', colors.blue)
        ],
        [
            textButton('💰 Пополнить', 'dep', colors.green),
            textButton('💸 Вывести', 'withdraw', colors.green),
        ]
    ]).inline()

    const honestyCheck = Keyboard.keyboard([
        [
            urlButton("#⃣ Проверка честности", 'https://vk.com/sokolov_roulette')
        ],
    ]).inline()

const chatSettingsBoard = Keyboard.keyboard([
    [
        textButton("⌛ Изменить время раунда", "changeEndTime", colors.blue)
    ],
    [
        textButton('🎰 Сменить игровой режим', 'changeGameMode', colors.blue)
    ],
    [
        textButton('➕👨‍💻 Добавить админа', 'addChatAdmin', colors.blue),
    ],
    [
        textButton('➖👨‍💻 Снять админа', 'delAdm', colors.red),
    ]
]).inline()

    const chooseGameInGroup = Keyboard.keyboard([
        [
            textButton('🎲 Cube ', 'set_game:cube', colors.green),
            textButton('🎰 Wheel ', 'set_game:wheel', colors.green)
        ],
        [
            textButton('🟣 Double', 'set_game:double', colors.green),
            textButton('⭐ Dice  ', 'set_game:dice', colors.green)
        ],
        [
            textButton('🔥 L7M', 'set_game:l7m', colors.green),
        ]
    ]).inline()

const topsBoard = Keyboard.keyboard([
    [
        textButton('⭐ Топ дня', 'dayTop', colors.green)
    ],
    [
        textButton('💰 Топ недели', 'weekTop', colors.blue)
    ],
]).inline()

const depInlineBoard = Keyboard.keyboard([
    [
        urlButton('🔗 Быстрое пополнение', `https://vk.com/app6887721_-209099203#donate_10`)
    ]
]).inline()

const reviewMenu = Keyboard.keyboard([
    [
        urlButton('✏ Оставить отзыв', 'https://vk.com/topic-209099203_48838015')
    ]
]).inline()

/*const mailingMenu = Keyboard.keyboard([
    [
        urlButton('📝 Отзывы', 'https://vk.com/topic-209099203_48838015'),
        urlButton('📖 Обучение', 'https://m.vk.com/@badmoneybirds-zarabotok'),
    ],
    [
        urlButton(
            '💳 Быстрое пополнение',
            'https://m.vk.com/app6887721_-209099203#donate_10'
        ),
    ],
    [urlButton('💬 Беседа', 'https://vk.me/join/AJQ1d_TAWiFqQesViof56Yel')],
]).inline();*/

module.exports = {
    inlineProfileBoard,
    topsBoard,
    reviewMenu,
    whatIsButton,
    chooseGameInGroup,
    chatSettingsBoard,
    honestyCheck
};
