const { dbUser } = require("../database/managers/user")




module.exports = async (msg) => {

    const nickname = await msg.question('Введите новый ник в игре:')

    if (!nickname.text) return msg.send('❗ Нам нужен текст :)')

    if (nickname.text.length <= 1 || nickname.text.length > 12) return msg.send('❌ Длина ника должна быть в диапазоне 1-12 символов, включительно')

    msg.send(`🥰 Успешно сменили ник на ${nickname.text}`)

    dbUser.setNickname(msg.senderId, nickname.text)

}