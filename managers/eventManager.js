const dep = require("../pages/callbackCommands/dep");
const myStats = require("../pages/callbackCommands/myStats");
const profile = require("../pages/callbackCommands/profile");
const ref = require("../pages/mainCommands/ref");
const withdrawnMoney = require("../pages/callbackCommands/withdraw");
const inDeveloping = require("../pages/adminCommands/inDeveloping");

module.exports = eventManager = (msg) => {
    const commands = {
        refs: () => ref(msg),
        myStats: () => myStats(msg),
        profile: () => profile(msg),
        dep: () => dep(msg),
        withdraw: () => withdrawnMoney(msg),
        inDeveloping: () => inDeveloping(msg)
    }

    try {
        commands[msg.eventPayload.command]();
    } catch (e) {

    }
}