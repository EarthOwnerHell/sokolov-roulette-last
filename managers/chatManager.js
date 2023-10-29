const addAdm = require("../pages/gameCommands/addAdm")
const balance = require("../pages/gameCommands/balance")
const bank = require("../pages/gameCommands/bank")
const changeEndTime = require("../pages/gameCommands/changeEndTime")
const changeGameMode = require("../pages/gameCommands/changeGameMode")
const delAdm = require("../pages/gameCommands/delAdm")
const makeBet = require("../pages/gameCommands/makeBet")
const setGame = require("../pages/gameCommands/setGame")

module.exports = chatManager = async (msg) => {
    commands = {
        'set_game': () => setGame(msg),
        'make_bet': () => makeBet(msg),
        'bank': () => bank(msg),
        'changeEndTime': () => changeEndTime(msg),
        'changeGameMode': () => changeGameMode(msg),
        'addChatAdmin': () => addAdm(msg),
        'delAdm' : () => delAdm(msg),
        'balance': () => balance(msg)
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
