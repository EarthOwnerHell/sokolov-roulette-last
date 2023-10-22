const { setUnban } = require('../../database/managers/user')
const { vk, questionManager, getId } = require('../../settings/vk')
const { formClick } = require('../../settings/tools')

vk.updates.use(questionManager.middleware)

module.exports = async (msg) => {

    const forBan = await msg.question('Вставьте ссылку на профиль')

    const userId = await getId(forBan.text)

    if (!userId.id || userId.type !== 'user') return msg.send('Ошибка, проверь вводимые данные')


    msg.send(`Успешно разбанили ${formClick(userId.id, 'пользователя')}`)
    
    setUnban(userId.id)

}
