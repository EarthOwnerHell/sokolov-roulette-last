const { Keyboard } = require("vk-io")
const { wheelBoard, doubleBoard, diceBoard, cubeBoard, l7mBoard } = require("../../keyboards/usual")

const gamePayloadsTranslate = {
    '1-12': ['1&#8419;', '1-12', '\n\n1&#8419; Ставки на 1-12:\n', 3],
    '13-24': ['2&#8419;', '13-24', '\n\n2&#8419; Ставки на 13-24:\n', 3],
    '25-36': ['3&#8419;', '25-36', '\n\n3&#8419; Ставки на 25-36:\n', 3],
    'red': ['🔴', 'Красное', '\n\n🔴 Ставки на Красное:\n', 2],
    'black': ['⚫', 'Чёрное', '\n\n⚫ Ставки на Чёрное:\n', 2],
    'zero': ['🟢', '0', '\n\n🟢 Ставки на 0:\n', 36],
    'even': ['⚡', 'Чётное', '\n\n⚡ Ставки на Чётное:\n', 2],
    'odd':['⚡', 'Нечётное', '\n\n⚡ Ставки на Нечётное:\n', 2],
    'one': ['1&#8419;', '1', '\n\n1&#8419; Ставки на 1:\n', 5],
    'two': ['2&#8419;', '2', '\n\n2&#8419; Ставки на 2:\n', 5],
    'three': ['3&#8419;', '3', '\n\n3&#8419; Ставки на 3:\n', 5],
    'four': ['4&#8419;', '4', '\n\n4&#8419; Ставки на 4:\n', 5],
    'five': ['5&#8419;', '5', '\n\n5&#8419; Ставки на 5:\n', 5],
    'six': ['6&#8419;', '6', '\n\n6&#8419; Ставки на 6:\n', 5],
    'golden': ['🟡', 'Золото', '\n\n🟡 Ставки на Золото:\n', 12],
    'white': ['⚪', 'Белое', '\n\n⚪ Ставки на Белое:\n', 2],
    '1-4': ['1&#8419;', '1-4', '\n\n1&#8419; Ставки на 1-4:\n', 3],
    '5-8': ['2&#8419;', '5-8', '\n\n2&#8419; Ставки на 5-8:\n', 3],
    '9-12': ['3&#8419;', '9-12', '\n\n3&#8419; Ставки на 9-12:\n', 3],
    '2X': ['🔵', '2X', '\n\n🔵 Ставки на 2X:\n', 2],
    '3X': ['🟢', '3X', '\n\n🟢 Ставки на 3X:\n', 3],
    '5X': ['🔴', '5X', '\n\n🔴 Ставки на 5X:\n', 5],
    '10X': ['🟣', '10X', '\n\n🟣 Ставки на 10X:\n', 10],
    'more': ['➡', 'Больше 7', '\n\n➡ Ставки на Больше 7:\n', 2.3],
    'seven': ['🔵', '7', '\n\n🔵 Ставки на 7:\n', 5.8],
    'less': ['⬅', 'Меньше 7', '\n\n⬅ Ставки на Меньше 7:\n', 2.3]
}

const photoesDependMode = {
    'wheel': {
        0: 'photo-210769620_457240484',
        1: 'photo-210769620_457240448',
        2: 'photo-210769620_457240449',
        3: 'photo-210769620_457240450',
        4: 'photo-210769620_457240451',
        5: 'photo-210769620_457240452',
        6: 'photo-210769620_457240453',
        7: 'photo-210769620_457240454',
        8: 'photo-210769620_457240455',
        9: 'photo-210769620_457240456',
        10: 'photo-210769620_457240457',
        11: 'photo-210769620_457240458',
        12: 'photo-210769620_457240459',
        13: 'photo-210769620_457240460',
        14: 'photo-210769620_457240461',
        15: 'photo-210769620_457240462',
        16: 'photo-210769620_457240463',
        17: 'photo-210769620_457240464',
        18: 'photo-210769620_457240465',
        19: 'photo-210769620_457240466',
        20: 'photo-210769620_457240467',
        21: 'photo-210769620_457240468',
        22: 'photo-210769620_457240469',
        23: 'photo-210769620_457240470',
        24: 'photo-210769620_457240471',
        25: 'photo-210769620_457240472',
        26: 'photo-210769620_457240473',
        27: 'photo-210769620_457240474',
        28: 'photo-210769620_457240475',
        29: 'photo-210769620_457240476',
        30: 'photo-210769620_457240477',
        31: 'photo-210769620_457240478',
        32: 'photo-210769620_457240479',
        33: 'photo-210769620_457240480',
        34: 'photo-210769620_457240481',
        35: 'photo-210769620_457240482',
        36: 'photo-210769620_457240483'
    },
    'dice': {
        0: 'photo-210769620_457240485',
        1: 'photo-210769620_457240486',
        2: 'photo-210769620_457240487',
        3: 'photo-210769620_457240488',
        4: 'photo-210769620_457240489',
        5: 'photo-210769620_457240490',
        6: 'photo-210769620_457240491',
        7: 'photo-210769620_457240492',
        8: 'photo-210769620_457240493',
        9: 'photo-210769620_457240494',
        10: 'photo-210769620_457240495',
        11: 'photo-210769620_457240496',
        12: 'photo-210769620_457240497'
    },
    'double' : {
        '2X' : '',
        '3X' : '',
        '5X' : '',
        '10X' : ''
    },
    'cube' : {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
    },
    'l7m' : {
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
        10: '',
        11: '',
        12: '',
    }
};


const typingBets = {
    '1-12': 'interval',
    '13-24': 'interval',
    '25-36': 'interval',
    'red': 'color',
    'black': 'color',
    'zero': 'special',
    'even': 'property',
    'odd': 'property',
    'one': 'number',
    'two': 'number',
    'three': 'number',
    'four': 'number',
    'five': 'number',
    'six': 'number',
    'golden': 'special',
    'white': 'color',
    '1-4': 'interval',
    '5-8': 'interval',
    '9-12': 'interval',
    '2X': 'coefficent',
    '3X': 'coefficent',
    '5X': 'coefficent',
    '10X': 'coefficent',
    'more': 'range',
    'seven': 'special',
    'less': 'range'
}

let maxOfBets = { 'color' : 1, 'interval' : 2, 'range' : 1, 'special' : 1, 'property' : 1, 'number' : 5, 'coefficent' : 2}

const botAlreadyAdmText = `👋🏻 Спасибо за приглашение!\n\n🎰 Выбирайте игровой режим!\n⚙ Админ беседы всегда сможет при желании его поменять, для этого напишите /settings для настройки беседы.`

const botSaysHello = `👋🏻 Спасибо за приглашение!\n\nℹ Выдайте мне, пожалуйста, администратора в этой беседе, иначе я не смогу работать.\n\n🎰 Выбирайте игровой режим!\n⚙ Админ беседы всегда сможет при желании его поменять, для этого напишите /settings для настройки беседы.`

const familiarChat = `👀 Знакомое место, кажется, я здесь был…\n\n🎰 Может, попробуем сначала? Выбирай режим!\n\n⚙ Если захотите поменять его, напишите команду /settings.`

const welcomeNewUserText = `👋🏻 Привет!\n\n🎰 Это @sokolov_roulette(SOKOLOV ROULETTE), игра на виртуальную валюту @diceys(Кубики) в формате бота.\n\n🤑 Топы дня, промокоды, раздачи, конкурсы и многое другое ждёт тебя в нашем проекте!`

module.exports = { maxOfBets, photoesDependMode, typingBets, gamePayloadsTranslate, botAlreadyAdmText, botSaysHello, familiarChat, welcomeNewUserText }