const { topsBoard } = require('../../keyboards/inline')

module.exports = tops = async (msg) => {
    return msg.send('⚡ Выбирай топ:', {keyboard: topsBoard})

}