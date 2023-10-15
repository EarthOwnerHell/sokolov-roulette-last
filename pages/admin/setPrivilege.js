const { dbUser } = require("../../database/managers/user")
const { vkHelp } = require("../../settings/vk")


module.exports = async (msg) => {

    let userLink = await msg.question('Отправь ссылку на чела')

    const user = await vkHelp.getIdByLink(userLink.text)
    
    if (!user.id) return msg.send('бля иди нахуй, го норм ссылку')

    const privilegeLvl = await msg.question('Введи номер привилегии.\n\n1 - VIP, 2 - Investor, 3 - бизнес мен, 0 - player')

    if (!Number(privilegeLvl.text) && Number(privilegeLvl.text) !== 0)return msg.send('Число')

    dbUser.setPrivilege(user.id, Number(privilegeLvl.text))

    msg.send('Успешно')
}
