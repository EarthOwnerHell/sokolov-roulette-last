const { keyboard, gameGetHashCallbackButton, urlButton, blue } = require("../helpers");




module.exports = (hash, isEnd = false, secret) => (
    keyboard([
        [
            gameGetHashCallbackButton({
                label: '#️⃣ Hash',
                payload: 'getHash',
                hash: hash,
                color: blue
            })
        ],
        isEnd ? [
            urlButton({
                label: '✅ Проверка честности',
                url: `https://vk.com/app7433551#${secret}`
            })
        ] : []
    ]).inline()
)