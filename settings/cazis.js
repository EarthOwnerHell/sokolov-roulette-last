const token = 'sfuur7t6m1tw9jioj7al3h3cxnm7hczu';

function cazisCallback() {
  var token = 'sfuur7t6m1tw9jioj7al3h3cxnm7hczu';

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
module.exports = cazisCallback;
