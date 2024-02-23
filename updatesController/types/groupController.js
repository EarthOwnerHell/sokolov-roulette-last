const { getUser, minusBalanceUser, plusBalanceUser } = require('../../database/managers/user');
const { vkHelp } = require('../../settings/vk');

module.exports = async (msg) => {
  const { userId, subTypes } = msg;
  const type = subTypes[0];

  const user = await getUser(userId);

  if (!user) return;

  if (type === 'group_join') {
    vkHelp({
      peer_id: userId,
      message: '🤑 На ваш баланс начислено 100 000 💎 за подписку на группу!',
    });
    return plusBalanceUser(userId, 100000);
  } else if (type === 'group_leave') {
    vkHelp({
      peer_id: userId,
      message: '🤧 Мы сняли 100 000 💎 с вашего баланса за отписку от группы',
    });
    return minusBalanceUser(userId, 100000);
  }
};
