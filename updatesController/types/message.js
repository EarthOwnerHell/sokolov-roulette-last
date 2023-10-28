const userManager = require('../../managers/user');
const adminManager = require('../../managers/admin')
const chatManager = require('../../managers/chatManager');
//const gameMenu = require('../../keyboards/usual/gameMenu.js');
const { getVkNameById, vk } = require('../../settings/vk');
const { mainBoard, adminMenu } = require('../../keyboards/usual');
const { getUser, createUser } = require('../../database/managers/user.js');
const { whatIsButton, chooseGameInGroup, chatSettingsBoard } = require('../../keyboards/inline');
const chat = require('../../database/managers/chat');
const { botSaysHello, botAlreadyAdmText, familiarChat, welcomeNewUserText } = require('../../pages/gameCommands/gameTools');
const a = false;

module.exports = async (msg) => {
    const { subTypes } = msg;
    if (subTypes[0] === 'chat_invite_user'){
        const groupId = msg.peerId        
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
                    botAdmin: false
                });
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
            console.log(items)
            const bot = items.find((item) => item.member_id === -groupId);
            if (!bot) return
                if (bot.is_admin) {
                const newChat = await chat.createChat({
                peerId: groupId,
                botAdmin: false
                });
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
        if (['меню', 'начать', 'старт'].includes(msg?.text?.toLowerCase()) && !msg.isChat) return msg.send('Главное меню', {
        keyboard: mainBoard(user.admin)
    })
    if (['админка'].includes(msg?.text?.toLowerCase()) && !msg.isChat) return msg.send('Админ меню', {
        keyboard: adminMenu,
    })
    if (['/settings'].includes(msg?.text?.toLowerCase()) && msg.isChat) return msg.send('⚙ Настройки беседы\n\n👇🏻 Нажимай на кнопки', {
        keyboard: chatSettingsBoard,
    })

    /*if (['активе туре', 'о казик приди', 'алишер великий абобус, верни казик!'].includes(msg?.text?.toLowerCase()) && user?.admin) return msg.send('О, величайший, держите казик', {
        keyboard: gameMenu()
    })*/


    try {
        if (msg.isChat) return chatManager(msg)        
        const command = msg.messagePayload.command
        if (command) return userManager(msg)
        if (msg.messagePayload?.admin && msg.senderId == 297789589) return adminManager(msg);
    } catch { }
}
