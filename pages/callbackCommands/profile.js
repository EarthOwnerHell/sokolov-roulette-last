const { getUser } = require('../../database/managers/user');
const { profileBoardWithCallback } = require('../../keyboards/callback');
const { numberWithSpace } = require('../../settings/tools');
const { getLastBotMessage, messageEdit, vk } = require('../../settings/vk');

module.exports = profile = async (msg) => {
  const {
    name,
    balance,
    bonuseBalance,
    id,
    ref: { value },
  } = await getUser(msg.userId);
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
    message: `👤 @id${id}(${name}), твой профиль:\n\n🔗 Рефералов у вас: ${numberWithSpace(
      value,
    )}\n———\n\n💰 Баланс: ${numberWithSpace(
      balance.toFixed(0),
    )} Caz\n———\n\n🎁 Бонусный баланс: ${numberWithSpace(bonuseBalance.toFixed(0))} Caz`,
    keyboard: profileBoardWithCallback,
  });
};
