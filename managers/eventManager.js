const ref = require("../pages/mainCommands/ref");
const withdrawnMoney = require("../pages/mainCommands/withdrawn");

module.exports = eventManager = (msg) => {
    const commands = {
        refs: () => ref(msg),
        withdrawn: () => withdrawnMoney(msg),
    }

    try {
        commands[msg.eventPayload.command]();
    } catch (e) {

    }
}