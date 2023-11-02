const myStats = require("../pages/callbackCommands/myStats");
const profile = require("../pages/callbackCommands/profile");
const ref = require("../pages/mainCommands/ref");
const withdrawnMoney = require("../pages/mainCommands/withdrawn");

module.exports = eventManager = (msg) => {
    const commands = {
        refs: () => ref(msg),
        myStats: () => myStats(msg),
        profile: () => profile(msg)
    }

    try {
        commands[msg.eventPayload.command]();
    } catch (e) {

    }
}