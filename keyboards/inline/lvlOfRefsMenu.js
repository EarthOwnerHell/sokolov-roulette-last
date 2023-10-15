const { textButton, red, keyboard } = require("../helpers");




module.exports = keyboard([
    [
        textButton({
            label: '🔥 Система уровней',
            payload: 'getLvlOfRefsPage',
            color: red
        })
    ]
]).inline()