const userManager = require("./user.js");

const buyUpgrades = require('../pages/goods/buyUpgrades')
const buyPrivilege = require('../pages/goods/buyPrivilege')
const buyCase = require('../pages/goods/buyCase')

const admin = require('./admin.js');
const setAvatar = require("../pages/setAvatar.js");
const gameManager = require("./game.js");
const createBet = require("../pages/game/createBet.js");

module.exports = (msg) => {

    const sendPayloadTo = {
        user: () => {
            if (msg.isChat) return;
            
            userManager(msg)
        },
        buyUpgrades: () => {
            if (msg.isChat) return;

            buyUpgrades(msg)
        },
        buyPrivilege: () => {
            if (msg.isChat) return;

            buyPrivilege(msg)
        },
        buyCase: () => {
            if (msg.isChat) return;

            buyCase(msg)
        },
        admin: () => {
            if (msg.isChat) return;

            admin(msg)
        },
        setAvatar: () => setAvatar(msg),
        game: () => gameManager(msg),
        bet: () => createBet(msg),
    }

    try {
        const command = Object.values(msg.messagePayload || msg.eventPayload)[1]

        sendPayloadTo[command]()
    } catch {

    }
}