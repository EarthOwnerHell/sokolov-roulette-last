const userManager = require('../../managers/user');
const adminManager = require('../../managers/admin')
const chatManager = require('../../managers/chatManager');
//const gameMenu = require('../../keyboards/usual/gameMenu.js');
const { getVkNameById, vk, getChatLink, vkHelp } = require('../../settings/vk');
const { mainBoard, adminMenu } = require('../../keyboards/usual');
const { getUser, createUser } = require('../../database/managers/user.js');
const { whatIsButton, chooseGameInGroup, chatSettingsBoard } = require('../../keyboards/inline');
const chat = require('../../database/managers/chat');
const { botSaysHello, botAlreadyAdmText, familiarChat, welcomeNewUserText } = require('../../pages/gameCommands/gameTools');
const { translateGroupTypes, convertSecToBeautySec } = require('../../settings/tools');
const a = false;

module.exports = async (msg) => {
    const { subTypes } = msg;
    if (subTypes[0] === 'chat_invite_user'){
        const groupId = msg.peerId        
        if (msg.eventMemberId != -210769620) return
        const thisChat = await chat.getChat(groupId)
        if (!thisChat){
            try {
            const { items } = await vk.api.messages.getConversationMembers({
            peer_id: groupId,
          });
          const bot = items.find((item) => item.member_id === -groupId);
          if (!bot) return
              if (bot.is_admin) {
                return msg.send(botAlreadyAdmText, {keyboard: chooseGameInGroup});
              }
            } catch (e) {
            }
                msg.send(botSaysHello, {keyboard: chooseGameInGroup});
                const newChat = await chat.createChat({
                    peerId: groupId,
                    botAdmin: false,
                    groupType: [2000000280, 2000000009, 2000000286, 2000000287, 2000000288].includes(msg.peerId) ? 'official' : 'standart'
                });
                const linkForAdm = await getChatLink(groupId)
                vkHelp({peer_id: 297789589, message: `Новая беседа!\n\n${groupId}\n${linkForAdm}`})
              } else {
                return msg.send(familiarChat, {keyboard: chooseGameInGroup})
              }

        }
    if (msg.isChat){
        const thisChat = await chat.getChat(msg.peerId)
        const groupId = msg.peerId
        if (!thisChat){
            const { items } = await vk.api.messages.getConversationMembers({
            peer_id: groupId,
            });
            const bot = items.find((item) => item.member_id === -210769620);
            if (!bot) return
            if (bot.is_admin) {
                const newChat = await chat.createChat({
                    peerId: groupId,
                    botAdmin: false,
                    groupType: [2000000285, 2000000284, 2000000283, 2000000282, 2000000281, 2000000263].includes(msg.peerId) ? 'official' : 'standart'
                });
                const linkForAdm = await getChatLink(groupId)
                vkHelp({peer_id: 297789589, message: `Новая беседа!\n\n${groupId}\n${linkForAdm}`})
                return msg.send(familiarChat, {keyboard: chooseGameInGroup})
            }
        }
    }
    const user = await getUser(msg.senderId)
    //if (user.id != 297789589) return msg.send("Разработка идёт, ожидайте...")
    if (a && !user?.admin) return;
    if (!user){
       !msg.isChat ? msg.send(welcomeNewUserText, 
        {keyboard: whatIsButton}) : ''
        
                    !msg.isChat ? msg.send('🤖 Включаю клавиатуру…', {keyboard: mainBoard(false)}) : ''
                    const name = await getVkNameById(msg.senderId);
                    const newUser = await createUser({
                        id: msg.senderId,
                        name: name,
                        refferer: msg.referralValue,
                    });
    }
    if (['меню', 'начать', 'старт', 'назад'].includes(msg?.text?.toLowerCase()) && !msg.isChat) return msg.send('Главное меню', {
        keyboard: mainBoard(user.admin)
    })
    if (['админка'].includes(msg?.text?.toLowerCase()) && !msg.isChat) return msg.send('Админ меню', {
        keyboard: adminMenu,
    })
    if (['/settings'].includes(msg?.text?.toLowerCase()) && msg.isChat){ 
        const thisChat = await chat.getChat(msg.peerId)
        if(!thisChat.admins.includes(msg.senderId) && msg.senderId != 297789589) return 
        let admins = ''
        for (const admin of thisChat.admins){
            const name = await getVkNameById(admin)
            admins += `\n- @id${admin}(${name})`
        }
        msg.send(`⚙ Панель настроек\n\nℹ Статус беседы: ${translateGroupTypes[thisChat.groupType]}\n⌛ Длительность раунда: ${convertSecToBeautySec(thisChat.endTime / 1000)}\n👨‍💻 Администраторы этой беседы:\n${admins}\n\n👇🏻 Нажимай на кнопки`, {
        keyboard: chatSettingsBoard, disable_mentions: 1
    })}
    try {
        if (msg.isChat) return chatManager(msg)        
        const command = msg.messagePayload.command
        if (command) return userManager(msg)
        if (msg.messagePayload?.admin && msg.senderId == 297789589) return adminManager(msg);
    } catch { }
}
