const { getUser, plusBalanceUser } = require('../../database/managers/user');
const { profileBoardWithCallback } = require('../../keyboards/callback');
const { numberWithSpace } = require('../../settings/tools');
const parsePhoneNumber = require('libphonenumber-js');
const { vk, questionManager } = require('../../settings/vk');
const promo = require('../../database/managers/promo');

module.exports = promoUse = async (msg) => {
  const { name, id } = await getUser(msg.senderId);

  const promoAsk = await msg.question('🎁❔ Введите промокод:');

  const promocode = promoAsk.text;

  const checkPromo = await promo.get(promocode);

  console.log(checkPromo);

  if (!checkPromo || checkPromo.usedBy.includes(id))
    return msg.send('❗ Промокода либо не существует, либо вы уже его использовали.');

  if (checkPromo.amountUsing == 0) return msg.send('❗ Этот промокод уже полность использован.');

  const newUserPromo = await promo.addUsing(promocode, id);

  const minusUsing = await promo.minusUsing(promocode);

  plusBalanceUser(id, checkPromo.amountForPromo);

  return msg.send(
    `🎁 @id${id}(${name}), вы успешно активировали промокод ${promocode} и получили ${numberWithSpace(
      checkPromo.amountForPromo,
    )} Caz!`,
  );
};
