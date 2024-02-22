const { vk, questionManager, getId, getVkNameById } = require('../../settings/vk');
const chat = require('../../database/managers/chat');

vk.updates.use(questionManager.middleware);

module.exports = addAdm = async (msg) => {
  if (!msg.isChat) return;

  const thisChat = await chat.getChat(msg.peerId);

  if (!thisChat.admins.includes(msg.senderId) && msg.senderId != 297789589) return;
  const askNewAdm = await msg.question('👨‍💻 Вставьте ссылку на профиль:');

  const newAdm = await getId(askNewAdm.text);

  if (thisChat.admins.includes(newAdm.id))
    return msg.send(`❗ Этот пользователь уже является администратором.`);

  if (!newAdm.id || newAdm.type !== 'user') return msg.send('❗ Ошибка, проверь вводимые данные');

  const admName = await getVkNameById(newAdm.id);

  const addChatAdm = await chat.addAdmin(msg.peerId, newAdm.id);

  return msg.send(`👨‍💻 Успешно добавлен новый админ беседы - @id${newAdm.id}(${admName})!`);
};
