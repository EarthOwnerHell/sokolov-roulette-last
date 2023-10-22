const { Keyboard } = require('vk-io')

const callBack = (label, command = label, color = Keyboard.SECONDARY_COLOR) => (
    Keyboard.callbackButton({
        label,
        payload: { command },
        color,
    })
)

module.exports = callBack