const userManager = require('../../managers/user');
const adminManager = require('../../managers/admin')
const chatManager = require('../../managers/chatManager');
//const gameMenu = require('../../keyboards/usual/gameMenu.js');
const { getVkNameById, vk } = require('../../settings/vk');
const { mainBoard, adminMenu } = require('../../keyboards/usual');
const { getUser, createUser } = require('../../database/managers/user.js');
const { whatIsButton, chooseGameInGroup } = require('../../keyboards/inline');
const chat = require('../../database/managers/chat');
const a = false;

module.exports = async (msg) => {
    const { subTypes } = msg;
    const user = await getUser(msg.senderId)
    //if (user.id != 297789589) return msg.send("Разработка идёт, ожидайте...")
    if (a && !user?.admin) return;
    if (!user){
       !msg.isChat ? msg.send(`
        👋🏻 Привет!

        🎰 Это @sokolov_roulette(SOKOLOV ROULETTE), игра на виртуальную валюту Кубики в формате бота.
                    
        🤑 Топы дня, промокоды, раздачи, конкурсы и многое другое ждёт тебя в нашем проекте!`, 
        {keyboard: whatIsButton}) : ''
        
                    !msg.isChat ? msg.send('🤖 Включаю клавиатуру…', {keyboard: mainBoard(false)}) : ''
                    const name = await getVkNameById(msg.senderId);
                    const newUser = await createUser({
                        id: msg.senderId,
                        name: name,
                        refferer: msg.referralValue,
                    });
    }
    if (subTypes[0] === 'chat_invite_user'){
        console.log(msg)
        const groupId = msg.peerId        
        const checkChat = await chat.getChat(msg.peerId)
        if (!checkChat){
            try {
            const { items } = await vk.api.messages.getConversationMembers({
            peer_id: groupId,
          });
          const bot = items.find((item) => item.member_id === -groupId);
          if (!bot) return
              if (bot.is_admin) {
                return msg.send(`
👋🏻 Спасибо за приглашение!
                      
🎰 Выбирайте игровой режим!
Админ беседы всегда сможет при желании его поменять.`, {keyboard: chooseGameInGroup});
              }
            } catch (e) {
            }
                msg.send(`
👋🏻 Спасибо за приглашение!
                
ℹ Выдайте мне, пожалуйста, администратора в этой беседе, иначе я не смогу работать.
                    
🎰 Выбирайте игровой режим!
Админ беседы всегда сможет при желании его поменять.`, {keyboard: chooseGameInGroup});
                const newChat = await chat.createChat({
                    peerId: groupId,
                    botAdmin: false
                });
              } else {
                return msg.send(`👀 Знакомое место, кажется, я здесь был…\n\n🎰 Может, попробуем сначала? Выбирай режим!`, {keyboard: chooseGameInGroup})
              }

        }
        if (['меню', 'начать', 'старт'].includes(msg?.text?.toLowerCase()) && !msg.isChat) return msg.send('Главное меню', {
        keyboard: mainBoard(user.admin)
    })
    if (['админка'].includes(msg?.text?.toLowerCase()) && !msg.isChat) return msg.send('Админ меню', {
        keyboard: adminMenu,
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
