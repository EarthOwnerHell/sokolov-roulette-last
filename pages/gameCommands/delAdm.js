const { vk, questionManager, getId, getVkNameById } = require('../../settings/vk')
const chat = require('../../database/managers/chat')

vk.updates.use(questionManager.middleware)

module.exports = delAdm = async (msg) => {
    if (!msg.isChat) return

    const thisChat = await chat.getChat(msg.peerId)

    if(!thisChat.admins.includes(msg.senderId) && msg.senderId != 297789589) return
    const askAdmForDel = await msg.question('❌ Вставьте ссылку на профиль:')

    const admForDel = await getId(askAdmForDel.text)

    console.log(admForDel)

    console.log(thisChat.admins)

    if (!thisChat.admins.includes(admForDel.id)) return msg.send(`❗ В этой беседе нет такого админа.`)

    if (!admForDel.id || admForDel.type !== 'user') return msg.send('❗ Ошибка, проверь вводимые данные')

    const admName = await getVkNameById(admForDel.id)

    const delAdm = await chat.delAdm(msg.peerId, admForDel.id) 

    return msg.send(`✅ @id${admForDel.id}(${admName}) снят с должности администратора.`)

}
