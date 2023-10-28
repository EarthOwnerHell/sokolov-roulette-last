const { vk, questionManager, getId, getVkNameById } = require('../../settings/vk')
const chat = require('../../database/managers/chat')

vk.updates.use(questionManager.middleware)

module.exports = addAdm = async (msg) => {
    if (!msg.isChat) return

    const thisChat = await chat.getChat(msg.peerId)

    if (!thisChat.admins.includes(msg.senderId)) return

    const askNewAdm = await msg.question('👨‍💻 Вставьте ссылку на профиль:')

    const newAdm = await getId(askNewAdm.text)

    if (!newAdm.id || newAdm.type !== 'user') return msg.send('❗ Ошибка, проверь вводимые данные')

    const admName = await getVkNameById(newAdm.id)

    const addChatAdm = await chat.addAdmin(msg.peerId, newAdm.id)

    msg.send(`👨‍💻 Успешно добавлен новый админ беседы - @id${newAdm.id}(${admName})!`)

}
