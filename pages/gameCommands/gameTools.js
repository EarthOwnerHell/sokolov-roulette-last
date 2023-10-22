const { Keyboard } = require("vk-io")
const { wheelBoard, doubleBoard, diceBoard, cubeBoard, l7mBoard } = require("../../keyboards/usual")

const forBetText = {
    '1-12': ['1&#8419;', '1-12'],
    '13-24': ['2&#8419;', '13-24'],
    '25-36': ['3&#8419;', '25-36'],
    'red': ['🔴', 'Красное'],
    'black': ['⚫', 'Чёрное'],
    'zero': ['🟢', '0'],
    'even': ['⚡', 'Чётное'],
    'odd':['⚡', 'Нечётное'],
    'one': ['1&#8419;', '1'],
    'two': ['2&#8419;', '2'],
    'three': ['3&#8419;', '3'],
    'four': ['4&#8419;', '4'],
    'five': ['5&#8419;', '5'],
    'six': ['6&#8419;', '6'],
    'golden': ['🟡', 'Золото'],
    'white': ['⚪', 'Белое'],
    '1-4': ['1&#8419;', '1-4'],
    '5-8': ['2&#8419;', '5-8'],
    '9-12': ['3&#8419;', '9-12'],
    '2X': ['🔵', '2X'],
    '3X': ['🟢', '3X'],
    '5X': ['🔴', '5X'],
    '10X': ['🟣', '10X'],
    'more': ['➡', 'Больше 7'],
    'seven': ['🔵', '7'],
    'less': ['⬅', 'Меньше 7']
}

let gameModelsForBank = {
    'l7m': {
        'odd' : [],
        'even' : [],
        'more' : [],
        'less' : [],
        'seven' : []
    },
    'wheel' : {
        'odd' : [],
        'even' : [],
        '1-12' : [],
        '13-24' : [],
        '25-36' : [],
        'zero' : [],
        'red' : [],
        'black' : []
    },
    'cube' : {
        'odd' : [],
        'even' : [],
        'one' : [], 'two' : [], 'three' : [], 'four' : [], 'five' : [], 'six' : []
    },
    'dice' : {
        'odd' : [],
        'even' : [],
        '1-4' : [],
        '5-8' : [],
        '9-12' : [],
        'golden' : [],
        'white' : [],
        'black' : []
    },
    'double' : {
        '2X' : [],
        '3X' : [],
        '5X' : [],
        '10X' : []
    }
}

module.exports = { forBetText, gamesArraysDefault, gameModelsForBank }