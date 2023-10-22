const { chooseGameInGroup } = require("../../keyboards/inline")
module.exports = async (msg) => {
    const chatId = msg.peerId;
    msg.send(`
👋🏻 Спасибо за приглашение!

ℹ Выдайте мне, пожалуйста, администратора в этой беседе, иначе я не смогу работать.
    
🎰 Выбирайте игровой режим!
Админ беседы всегда сможет при желании его поменять.`, {keyboard: chooseGameInGroup});
}
