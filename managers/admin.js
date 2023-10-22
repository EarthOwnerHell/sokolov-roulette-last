const { adminMenu } = require("../keyboards/usual")
const buyCourse = require("../pages/adminCommands/buyCourse")
const giveBalance = require("../pages/adminCommands/giveBalance")
const giveBan = require("../pages/adminCommands/giveBan")
const giveUnban = require("../pages/adminCommands/giveUnban")
const mailing = require("../pages/adminCommands/mailing")
const newBonusePost = require("../pages/adminCommands/newBonusePost")
const forRef = require("../pages/adminCommands/forRef")

module.exports = adminManager = async (msg) => {

    commands = {
        admin: () =>
            msg.send('Админ меню', {
                keyboard: adminMenu,
            }),
        newBonus: () => newBonusePost(msg),
        mailing: () => mailing(msg),
        giveBan: () => giveBan(msg),
        giveBalance: () => giveBalance(msg),
        courseBuy: () => buyCourse(msg),
        forRef: () => forRef(msg),
        giveUnban: () => giveUnban(msg)
    };

    try {
        commands[msg.messagePayload.admin]()
    } catch (e) { console.log(e) }

}
