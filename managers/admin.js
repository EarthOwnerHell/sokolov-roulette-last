const { adminMenu } = require("../keyboards/usual")
const giveBalance = require("../pages/adminCommands/giveBalance")
const giveBan = require("../pages/adminCommands/giveBan")
const giveUnban = require("../pages/adminCommands/giveUnban")
const mailing = require("../pages/adminCommands/mailing")
const newBonusePost = require("../pages/adminCommands/newBonusePost")
const forRef = require("../pages/adminCommands/forRef")
const newPromo = require("../pages/adminCommands/createPromo")
const changeGroupType = require("../pages/adminCommands/changeGroupType")
const info = require("../pages/adminCommands/info")

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
        giveUnban: () => giveUnban(msg),
        newPromo: () => newPromo(msg),
        info: () => info(msg),
        changeGroupType: () => changeGroupType(msg)
    };

    try {
        commands[msg.messagePayload.admin]()
    } catch (e) { console.log(e) }

}
