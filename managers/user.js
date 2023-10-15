const chooseUpgrades = require('../pages/main/chooseUpgrades.js')
const choosePrivilege = require('../pages/main/choosePrivilege.js')
const info = require('../pages/main/info.js')
const getProfile = require('../pages/main/profile.js')
const refLink = require('../pages/main/refLink.js')
const topOfInvestors = require('../pages/tops/topOfInvestors.js')
const topOfRefs = require('../pages/tops/topOfRefs.js')
const wallet = require('../pages/main/wallet.js')
const createWithdraw = require('../pages/createWithdraw.js')
const setQiwi = require('../pages/setQiwi.js')
const getBonuse = require('../pages/getBonuse.js')
const setNick = require('../pages/setNick.js')
const chooseCases = require('../pages/main/chooseCases.js')
const chooseAvatar = require('../pages/main/chooseAvatar.js')
const lvlsOfRefs = require('../pages/main/lvlsOfRefs.js')

module.exports = async (msg) => {
    
    const commands = {
        getProfile: () => getProfile(msg),
        getRefsPage: () => refLink(msg),
        info: () => info(msg),
        getTopInvest: () => topOfInvestors(msg),
        getTopRefs: () => topOfRefs(msg),
        getInvesting: () => chooseUpgrades(msg),
        getPrivileges: () => choosePrivilege(msg),
        getWalletPage: () => wallet(msg),
        withdrawMoney: () => createWithdraw(msg),
        setQiwi: () => setQiwi(msg),
        getBonuseForPrivilege: () => getBonuse(msg),
        setNickname: () => setNick(msg),
        getCasePage: () => chooseCases(msg),
        stopEducation: () => msg.send('Ты думал, что ты можешь пропустить обучение, которое уже началось?'),
        chooseAvatar: () => chooseAvatar(msg),
        getLvlOfRefsPage: () => lvlsOfRefs(msg)
    }

    try {
        const command = Object.values(msg.messagePayload || msg.eventPayload)[0]

        commands[command]()
    } catch (e) { console.log('[ ❗ ] Не нашли команду при нажатии') }

}