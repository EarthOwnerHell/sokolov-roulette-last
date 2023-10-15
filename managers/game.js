const getBank = require("../pages/game/getBank")
const getBalance = require("../pages/game/helpers/getBalance")
const sendHash = require("../pages/game/helpers/sendHash")

module.exports = async (msg) => {
    const commands = {
        "getBalance": () => getBalance(msg),
        "getHash": () => sendHash(msg),
        "getBank": () => getBank(msg),
    }

    try {
        const command = Object.values(msg.messagePayload || msg.eventPayload)[0]

        commands[command]()
    } catch (e) { console.log('[ ❗ ] Не нашли команду при нажатии', e) }

}