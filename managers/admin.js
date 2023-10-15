const adminMenu = require("../keyboards/inline/admin")
const changeCourse = require("../pages/admin/changeCourse")
const createBonuseForRepost = require("../pages/admin/createBonuseForRepost")
const giveBalance = require("../pages/admin/giveBalance")
const mailing = require("../pages/admin/mailing")
const setBan = require("../pages/admin/setBan")
const setHackPercent = require("../pages/admin/setHackPercent")
const setPrivilege = require("../pages/admin/setPrivilege")
const setRefBonuse = require("../pages/admin/setRefBonuse")

module.exports = async (msg) => {
    
    const commands = {
        admin: () => { msg.send('На', { keyboard: adminMenu })},
        mailing: () => mailing(msg),
        changeBalance: () => giveBalance(msg),
        changeCourses: () => changeCourse(msg),
        createRepost: () => createBonuseForRepost(msg),
        setPrivilege: () => setPrivilege(msg),
        setBan: () => setBan(msg),
        setHackPercent: () => setHackPercent(msg),
        sendToHui: () => {
            msg.send('ТЫ НЕ МОГ БЛЯТЬ РАНЬШЕ О СВОЕЙ КЛАВИАТУРЕ С ЧИСЛАМИ БЛЯТЬ ПРИДУМАТЬ, ТЕМА, НАХУЙ? НЕ В 2:40 НОЧИ')
        },
        setRefBonuse: () => setRefBonuse(msg),
    }

    try {
        const command = Object.values(msg.messagePayload || msg.eventPayload)[0]

        commands[command]()
    } catch (e) { console.log('[ ❗ ] Не нашли команду при нажатии') }

}