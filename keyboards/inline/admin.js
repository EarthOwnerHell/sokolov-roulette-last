const { keyboard, adminButton, white, red, blue } = require("../helpers");

module.exports = keyboard([
    [
        adminButton({
            label: 'Рассылка',
            payload: 'mailing',
            color: white
        })
    ],
    [
        adminButton({
            label: 'Баланс',
            payload: 'changeBalance',
            color: blue
        }),
        adminButton({
            label: 'XеКпЕрЦеНт',
            payload: 'setHackPercent',
            color: white,
        })
    ],
    [
        adminButton({
            label: 'Смена курсов',
            payload: 'changeCourses',
            color: red
        })
    ],
    [
        adminButton({
            label: 'Создание репоста',
            payload: 'createRepost',
            color: white
        })
    ],
    [
        adminButton({
            label: 'Изменение привилегии',
            payload: 'setPrivilege',
            color: blue
        })
    ],
    [
        adminButton({
            label: 'Изменение бана',
            payload: 'setBan',
            color: red
        })
    ],
    [
        adminButton({
            label: 'Курс для рефов',
            payload: 'setRefBonuse',
            color: white
        })
    ]
])