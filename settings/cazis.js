const { plusDeppedCubes, plusBalanceUser } = require('../database/managers/user');
const { numberWithSpace } = require('./tools');
const { vkHelp } = require('./vk');

const token = 'sfuur7t6m1tw9jioj7al3h3cxnm7hczu';

function cazisCallback() {
  const axios = require('axios');

  const url = 'https://richbum.ru/api/v1/callback';
  const data = {
    url: 'https://blackjack-server.online',
  };
  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };

  return axios
    .post(url, data, { headers })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

async function plusCazis(id, sum) {
  console.log(sum);
  vkHelp({
    peer_id: id,
    message: `✅ Баланс пополненен на ${numberWithSpace(sum)} 💎\n🍀 Приятной игры!`,
  });
  vkHelp({
    peer_id: 297789589,
    message: `@id${id}(Пользователь) пополнил баланс на ${numberWithSpace(sum.toFixed(0))} 💎!`,
  });
  await plusDeppedCubes(id, sum);
  await plusBalanceUser(id, sum);
  return;
}

async function whatReserve() {
  const axios = require('axios');

  const url = 'https://richbum.ru/api/v1/balance';

  const headers = {
    Authorization: 'Bearer ' + token,
    player_id: 297789589,
  };

  let reserve = 0;

  axios
    .get(url, { headers })
    .then((response) => {
      reserve = response.data.balance;
    })
    .catch((error) => {
      console.error(error);
    });

  return reserve;
}

async function sendCazis(id, amount) {
  const axios = require('axios');

  const url = 'https://richbum.ru/api/v1/send_coins';

  const headers = {
    Authorization: 'Bearer ' + token,
    amount: amount,
    recipient_id: id,
  };

  return axios
    .post(url, { headers })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = { cazisCallback, plusCazis, sendCazis, whatReserve };
