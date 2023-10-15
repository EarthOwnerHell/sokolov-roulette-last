const { keyboard, gameCallbackButton, green, gameButton, red, white, blue, urlButton } = require("../helpers")




module.exports = () => (
    keyboard([
        [
            gameCallbackButton({
                label: 'Ставки',
                payload: 'getBank',
                color: green
            }),
            gameCallbackButton({
                label: 'Баланс',
                payload: 'getBalance',
                color: green
            })
        ],
        [
            gameButton({
                label: 'Красное',
                payload: 'betRed',
                color: red,
                betType: 'color'
            }),
            gameButton({
                label: 'Черное',
                payload: 'betBlack',
                color: white,
                betType: 'color'
            })
        ],
        [
            gameButton({
                label: '1-12',
                payload: 'betOnFirstDiaposon',
                color: blue,
                betType: 'diaposon',
            }),
            gameButton({
                label: '13-24',
                payload: 'betOnSecondDiaposon',
                color: blue,
                betType: 'diaposon',
            }),
            gameButton({
                label: '25-36',
                payload: 'betOnThirdDiaposon',
                color: blue,
                betType: 'diaposon',
            }),
        ],
        [
            gameButton({
                label: 'Четное',
                payload: 'betEven',
                color: blue,
                betType: 'typeNumber',
            }),
            gameButton({
                label: 'Число',
                payload: 'betOnNumber',
                color: white,
                betType: 'number',
            }),
            gameButton({
                label: 'Нечетное',
                payload: 'betOdd',
                color: blue,
                betType: 'typeNumber',
            }),
        ],
        [
            urlButton({
                label: '🔥 Быстрое пополнение',
                url: 'https://vk.com/app6887721_-210860036#donate_10'
            })
        ]
    ])
)