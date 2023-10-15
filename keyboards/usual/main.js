const { keyboard, textButton, green, red, blue, callbackButton, adminButton, white } = require("../helpers")

module.exports = (admin) => keyboard([
    [
        textButton({
            label: '🖥 Профиль',
            payload: 'getProfile',
            color: green,
        })
    ],
    [
        textButton({
            label: '💵 Инвестировать',
            payload: 'getInvesting',
            color: red,
        }),
        textButton({
            label: '👑 Привелегии',
            payload: 'getPrivileges',
            color: green,
        })
    ],
    [
        textButton({
            label: '🍀 Кейсы',
            payload: 'getCasePage',
            color: white
        }),
        textButton({
            label: '💳 Кошелёк',
            payload: 'getWalletPage',
            color: white
        })
    ],
    [
        callbackButton({
            label: '🎁 Рефералы',
            payload: 'getRefsPage',
            color: blue,
        })
    ],
    [
        textButton({
            label: '📊 Статистика',
            payload: 'info',
            color: green,
        })
    ],
    admin ? [
        adminButton({ label: 'Админка', payload: 'admin', color: red })
    ] : [ ]
])
