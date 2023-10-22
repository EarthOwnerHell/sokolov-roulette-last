const makeBet = require("../pages/gameCommands/makeBet")
const setGame = require("../pages/gameCommands/setGame")

module.exports = chatManager = async (msg) => {
    commands = {
        'set_game': () => setGame(msg),
        'make_bet': () => makeBet(msg),
    }
    try {
        if (msg.messagePayload.command.includes(':')){
            const payload = msg.messagePayload.command
            console.log(payload)
            const forManager = payload.split(':')
            return commands[forManager[0]]()
        } else return commands[msg.messagePayload.command]()

    } catch (e) {console.log('--> Не нажали на кнопку Chat Manager\'a') }

}
