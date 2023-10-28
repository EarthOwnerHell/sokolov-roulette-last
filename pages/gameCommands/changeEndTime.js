const { vk, questionManager } = require('../../settings/vk');
const chat = require('../../database/managers/chat');

vk.updates.use(questionManager.middleware);

module.exports = changeEndTime = async (msg) => {
    if (!msg.isChat) return

    const thisChat = await chat.getChat(msg.peerId)

    if (!thisChat.admins.includes(msg.senderId)) return

    const askNewTime = await msg.question('⌛ Введите новое время раунда (в секундах):');

    const newTime = askNewTime.text

    if (newTime > 120) return msg.send('❗ Раунд не может длиться более 2-ух минут!')

    if (newTime < 15) return msg.send('❗ Раунд не может длиться менее 15 секунд!')

    const newEndTime = await chat.setEndTime(msg.peerId, newTime * 1000)

    return msg.send(`✅ Теперь раунд будет длиться ${newTime} секунд`);
};
