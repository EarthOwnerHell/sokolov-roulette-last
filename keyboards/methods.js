const { Keyboard } = require('vk-io')

const colors = {
    'green' : Keyboard.POSITIVE_COLOR,
    'blue' : Keyboard.PRIMARY_COLOR,
    'red' : Keyboard.NEGATIVE_COLOR,
    'grey' : Keyboard.SECONDARY_COLOR
}
const makeButton = (label, command, color = Keyboard.SECONDARY_COLOR) => Keyboard.textButton({
    label,
    payload: {
      command
    },
    color
  })

  const urlButton = (label, url) => (
    Keyboard.urlButton({
        label,
        url,
    })
)
    

const textButton = (label, command = label, color = Keyboard.SECONDARY_COLOR) => (
    Keyboard.textButton({
        label,
        payload: { command },
        color,
    })
)

const adminButton = (label, admin = label, color = Keyboard.SECONDARY_COLOR) => (
    Keyboard.textButton({
        label,
        payload: { admin },
        color,
    })
)

const callBack = (label, command = label, color = Keyboard.SECONDARY_COLOR) => (
    Keyboard.callbackButton({
        label,
        payload: { command },
        color,
    })
)

module.exports = {
    makeButton, urlButton, textButton, adminButton, callBack, colors
}