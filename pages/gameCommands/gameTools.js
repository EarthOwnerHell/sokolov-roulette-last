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

module.exports = { maxOfBets, typingBets, gamePayloadsTranslate, botAlreadyAdmText, botSaysHello, familiarChat, welcomeNewUserText }