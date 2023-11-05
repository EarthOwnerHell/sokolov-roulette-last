const { sendEventAnswer } = require("../../settings/vk")

module.exports = inDeveloping = async (msg) => {
    return sendEventAnswer(msg, '⚙ В разработке...', 'show_snackbar')
}