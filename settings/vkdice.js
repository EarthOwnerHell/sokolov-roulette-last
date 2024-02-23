const { VKDice, VKDiceCallback } = require('vkdice-api');
const { tokenDice, reserve } = require('./config.json');
const { plusBalanceUser, plusDeppedCubes } = require('../database/managers/user');
const { numberWithSpace } = require('./tools');
const { vkHelp } = require('./vk');

const vkDice = new VKDice({ key: tokenDice, merchant: reserve });
const vkDiceCallback = new VKDiceCallback(vkDice);

async function sendCubes(id, amount) {
  return vkDice.api.coins.send({ user: id, amount: amount });
}

async function whatReserve() {
  return vkDice.api.coins.balance({ user: reserve });
}

async function plusCubics(id, sum) {
  vkHelp({
    peer_id: id,
    message: `✅ Баланс пополненен на ${numberWithSpace(sum)} 💎\n🍀 Приятной игры!`,
  });
  vkHelp({
    peer_id: 297789589,
    message: `@id${id}(Пользователь) пополнил баланс на ${numberWithSpace(
      sum.toFixed(0),
    )} кубиков!`,
  });
  await plusDeppedCubes(id, sum);
  await plusBalanceUser(id, sum);
  return;
}

module.exports = {
  vkDice,
  vkDiceCallback,
  sendCubes,
  whatReserve,
  plusCubics,
};
