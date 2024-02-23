const { lvlOfRefBoard } = require('../../keyboards/inline');
const { vk } = require('../../settings/vk');
const { deckOfNum, numberWithSpace } = require('../../settings/tools');
const { getGlobal } = require('../../database/managers/global');
const { getUser } = require('../../database/managers/user');

module.exports = ref = async (msg) => {
  const { forRef } = await getGlobal();
  const {
    id,
    ref: { value },
  } = await getUser(msg.senderId);

  vk.api
    .call('utils.getShortLink', { url: `vk.me/sokolov_roulette?ref=${id}` })
    .then(function (res) {
      msg.send(
        `ℹ Реферальная система\n\nℹ Приглашай друзей по своей ссылке и получай бонус в размере ${numberWithSpace(
          forRef,
        )} 💎!\n\n📎 Ваша реферальная ссылка:\n[ ${res.short_url} ]`,
      );
    });

  /*vk.api.messages.sendMessageEventAnswer({
        event_id: msg.eventId,
        user_id: msg.userId,
        peer_id: msg.peerId,
        event_data: JSON.stringify({
            'type': 'show_snackbar',
            'text': `ℹ У вас ${new Intl.NumberFormat('ru-RU').format(value)} ${res}`
        })
    })*/
};
