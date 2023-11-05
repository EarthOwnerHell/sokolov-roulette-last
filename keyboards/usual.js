const { textButton, adminButton, colors, urlButton } = require('./methods')
const { Keyboard } = require('vk-io')

const mainBoard = (admin) => (
    Keyboard.keyboard([
        [
            textButton('🎰 Играть', 'games', colors.red),              
        ],
        [
            textButton('👤 Профиль', 'profile', colors.blue),    
            textButton('🏪 Магазин ', 'shop', colors.blue)
        ],
        [
            textButton('ℹ Статистика', "stats", colors.green),
            textButton('⚡ Топы', 'tops', colors.green)
        ],
        [
            textButton('👥 Реферальная система', 'ref', colors.grey)
        ],
        admin ? [
            adminButton('Админка', 'admin', colors.red)
        ] : [ ]
    ])
)

const wheelBoard = (
    Keyboard.keyboard([
        [
            textButton('Баланс', 'balance', colors.green), 
            textButton('Банк', 'bank', colors.green)             
        ],
        [
            textButton('1-12', 'make_bet:1-12', colors.blue),    
            textButton('13-24', 'make_bet:13-24', colors.blue),
            textButton('25-36', 'make_bet:25-36', colors.blue)
        ],
        [
            textButton('Красное', "make_bet:red", colors.red),
            textButton('0', 'make_bet:zero', colors.green),
            textButton('Чёрное', 'make_bet:black', colors.grey)
        ],
        [
            textButton('Чётное', 'make_bet:even', colors.blue),
            textButton('Нечётное', 'make_bet:odd', colors.blue)
        ],
        [
            urlButton('🔗 Пополнить', 'https://vk.com/sokolov_roulette')
        ]
    ])
)

const cubeBoard = (
    Keyboard.keyboard([
        [
            textButton('Баланс', 'balance', colors.green), 
            textButton('Банк', 'bank', colors.green)             
        ],
        [
            textButton('1', 'make_bet:one', colors.red),    
            textButton('2', 'make_bet:two', colors.red),
            textButton('3', 'make_bet:three', colors.red)
        ],
        [
            textButton('4', "make_bet:four", colors.red),
            textButton('5', 'make_bet:five', colors.red),
            textButton('6', 'make_bet:six', colors.red)
        ],
        [
            textButton('Чётное', 'make_bet:even', colors.blue),
            textButton('Нечётное', 'make_bet:odd', colors.blue)
        ],
        [
            urlButton('🔗 Пополнить', 'https://vk.com/sokolov_roulette')
        ]
    ])
)

const diceBoard = (
    Keyboard.keyboard([
        [
            textButton('Баланс', 'balance', colors.green), 
            textButton('Банк', 'bank', colors.green)             
        ],
        [
            textButton('Чёрное', 'make_bet:black', colors.blue),  
            textButton('Золото', 'make_bet:golden', colors.blue),        
            textButton('Белое', 'make_bet:white', colors.blue),
        ],
        [
            textButton('1-4', "make_bet:1-4", colors.red),
            textButton('5-8', 'make_bet:5-8', colors.red),
            textButton('9-12', 'make_bet:9-12', colors.red)
        ],
        [
            textButton('Чётное', 'make_bet:even', colors.blue),
            textButton('Нечётное', 'make_bet:odd', colors.blue)
        ],
        [
            urlButton('🔗 Пополнить', 'https://vk.com/sokolov_roulette')
        ]
    ])
)

const doubleBoard = (
    Keyboard.keyboard([
        [
            textButton('Баланс', 'balance', colors.grey), 
            textButton('Банк', 'bank', colors.grey)             
        ],
        [
            textButton('2X', 'make_bet:2X', colors.blue),  
            textButton('3X', 'make_bet:3X', colors.green),        
            textButton('5X', 'make_bet:5X', colors.red),
            textButton('10X', "make_bet:10X", colors.blue),
        ],
        [
            urlButton('🔗 Пополнить', 'https://vk.com/sokolov_roulette')
        ]
    ])
)

const l7mBoard = (
    Keyboard.keyboard([
        [
            textButton('Баланс', 'balance', colors.grey), 
            textButton('Банк', 'bank', colors.grey)             
        ],
        [
            textButton('Больше', 'make_bet:more', colors.green),  
            textButton('7', 'make_bet:seven', colors.blue),        
            textButton('Меньше', 'make_bet:less', colors.green),
        ],
        [
            urlButton('🔗 Пополнить', 'https://vk.com/sokolov_roulette')
        ]
    ])
)


const adminMenu = Keyboard.keyboard([
    [
        adminButton('Новый бонус за репост', 'newBonus', colors.blue),
        adminButton('Cделать неактивной', 'makeUnactive', colors.blue)
    ],
    [
        adminButton('Рассылка', 'mailing', colors.green)
    ],
    [
        adminButton('Выдать бан', 'giveBan', colors.green),
        adminButton('Выдать разбан', 'giveUnban', colors.green)
    ],
    [
        adminButton('Выдать баланс', 'giveBalance', colors.blue)
    ],
    [
        adminButton('Сумма за рефа', 'forRef', colors.red),
        adminButton('Новый промокод', 'newPromo', colors.blue)
    ],
    [
        adminButton('Изменить статус беседы', 'changeGroupType', colors.green),
    ],
    [
        textButton('Назад', 'back', colors.red)
    ]
])

const gameKeyboard = {
    'wheel' : wheelBoard,
    'double': doubleBoard,
    'dice': diceBoard,
    'cube': cubeBoard,
    'l7m': l7mBoard
}

module.exports = {
    mainBoard,
    adminMenu,
    wheelBoard,
    doubleBoard,
    diceBoard,
    cubeBoard,
    l7mBoard,
    gameKeyboard
}
