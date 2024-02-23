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

async function plusCazis(id, sum) {}

module.exports = cazisCallback;
module.exports = plusCazis;
