const { dbUser } = require("../../database/managers/user")
const { vkHelp } = require("../../settings/vk")


module.exports = async (msg) => {

    let userLink = await msg.question('Отправь ссылку на чела')

    const user = await vkHelp.getIdByLink(userLink.text)
    
    if (!user.id) return msg.send('бля иди нахуй, го норм ссылку')

    const banValue = await msg.question('Введи значение бана ( 0 - разбанен, 1 - бан )')

    if (![1,0].includes(Number(banValue.text))) return msg.send('Ты даун?')

    dbUser.setBan(user.id, Number(banValue.text))

    msg.send('Успешно')
}
