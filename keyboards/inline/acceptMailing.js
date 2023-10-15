const { textButton, keyboard, green, red } = require("../helpers")

const noButtonBoard = keyboard([
    [textButton({ label: 'ПОДТВЕРДИТЬ', payload: 'accept', color: green })],
    [textButton({ label: 'ОТМЕНА', payload: 'no', color: red })],
]).inline();

module.exports = noButtonBoard