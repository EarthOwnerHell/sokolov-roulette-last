const { keyboard, adminButton, green } = require('../helpers')

module.exports.againGiveBalanceMenu = keyboard([
    adminButton({
        label: 'Выдать баланс',
        payload: 'changeBalance',
        color: green
    })
]).inline()

module.exports.amounts = keyboard([
    [
        adminButton({
            label: '10000',
            payload: null,
            color: green
        }),
        adminButton({
            label: '20000',
            payload: null,
            color: green
        }),
    ], 
    [
        adminButton({
            label: '30000',
            payload: null,
            color: green
        }),
        adminButton({
            label: '40000',
            payload: null,
            color: green
        }),
    ],
    [
        adminButton({
            label: 'заебали с суммами',
            payload: 'sendToHui',
            color: green
        }),
    ],
    [
        adminButton({
            label: '50000',
            payload: null,
            color: green
        }),
    ],
    [
        adminButton({
            label: '100000',
            payload: null,
            color: green
        }),
    ],
]).inline()