const { getUser } = require('../../database/managers/user');
const { profileBoardWithCallback, backToProfile } = require('../../keyboards/callback');
const { numberWithSpace } = require('../../settings/tools');
const { getLastBotMessage, messageEdit, vk } = require('../../settings/vk');

module.exports = dep = async (msg) => {
  const { eventId, userId, peerId } = msg;

  const lastMessage = await getLastBotMessage(peerId);

  vk.api.messages.sendMessageEventAnswer({
    event_id: eventId,
    user_id: userId,
    peer_id: peerId,
  });
  messageEdit({
    peer_id: peerId,
    message_id: lastMessage,
    message: `💰 Пополнение\n\nℹ Для пополнения баланса 💎 переведите любую сумму на аккаунт https://vk.com/id297789589 в официальной группе @cazis(Валюты), пополнения работают автоматически.`,
    keyboard: backToProfile(false),
  });
};
