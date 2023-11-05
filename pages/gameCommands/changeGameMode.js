const { vk, questionManager } = require('../../settings/vk');
const chat = require('../../database/managers/chat');
const { chooseGameInGroup } = require('../../keyboards/inline');
const game = require('../../database/managers/game');
const bet = require('../../database/managers/bet');

vk.updates.use(questionManager.middleware);

module.exports = changeGameMode = async (msg) => {
    if (!msg.isChat) return

    const thisChat = await chat.getChat(msg.peerId)

    if(!thisChat.admins.includes(msg.senderId) && msg.senderId != 297789589) return
    
    const isGame = await game.getGame(msg.peerId)

    if(isGame){
        const betsOnGame = await bet.getBets(isGame._id)
        if (betsOnGame.length > 0) return msg.send(`❗ Нельзя сменить режим во время активного раунда`)

    }
        
    return msg.send(`🎰 Выбирайте игровой режим!`, {keyboard: chooseGameInGroup()});
};
