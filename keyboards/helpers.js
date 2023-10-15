const { Keyboard } = require('vk-io')

const keyboard = Keyboard.keyboard

const green = Keyboard.POSITIVE_COLOR
const red = Keyboard.NEGATIVE_COLOR
const white = Keyboard.SECONDARY_COLOR
const blue = Keyboard.PRIMARY_COLOR

const textButton = ({ label, payload, color }) => (
    Keyboard.textButton({
        label,
        payload: {
            command: payload,
            type: 'user'
        },
        color
    })
)

const gameButton = ({ label, payload, betType, color }) => (
    Keyboard.textButton({
        label,
        payload: {
            command: payload,
            type: 'bet',
            betType: betType
        },
        color
    })
)

const gameCallbackButton = ({ label, payload, color }) => (
    Keyboard.callbackButton({
        label,
        payload: { 
            command: payload,
            type: 'game' 
        },
        color,
    })
)

const saltButton = ({ label, payload, hash, secretWord, color }) => (
    Keyboard.callbackButton({
        label,
        payload: { 
            command: payload,
            type: 'game',
            hash,
            secretWord,
        },
        color,
    })
)

const gameGetHashCallbackButton = ({ label, payload, color, hash }) => (
    Keyboard.callbackButton({
        label,
        payload: { 
            command: payload,
            type: 'game',
            hash: hash,
        },
        color,
    })
)

const urlButton = ({ label, url }) => (
    Keyboard.urlButton({
        label,
        url,
    })
)

const adminButton = ({ label, payload, color }) => (
    Keyboard.textButton({
        label,
        payload: {
            adminCommand: payload,
            type: 'admin'
        },
        color
    })
)

const callbackButton = ({ label, payload, color }) => (
    Keyboard.callbackButton({
        label,
        payload: { 
            command: payload,
            type: 'user' 
        },
        color,
    })
)

const buyPrivilegeButton = ({ label, url }) => (
    Keyboard.urlButton({
        label,
        url,
    })
)

module.exports = {
    keyboard,
    green,
    white,
    red,
    blue,
    textButton,
    urlButton,
    adminButton,
    callbackButton,
    buyPrivilegeButton,
    gameButton,
    gameCallbackButton,
    gameGetHashCallbackButton,
    saltButton,
}
