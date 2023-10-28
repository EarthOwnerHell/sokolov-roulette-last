const { vk, questionManager } = require('../../settings/vk');
const chat = require('../../database/managers/chat');
const { chooseGameInGroup } = require('../../keyboards/inline');

vk.updates.use(questionManager.middleware);

module.exports = changeGameMode = async (msg) => {
    if (!msg.isChat) return

    const thisChat = await chat.getChat(msg.peerId)

    if (!thisChat.admins.includes(msg.senderId)) return

    return msg.send(`🎰 Выбирайте игровой режим!`, {keyboard: chooseGameInGroup});
};
