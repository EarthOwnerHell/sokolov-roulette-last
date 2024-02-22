const token = 'sfuur7t6m1tw9jioj7al3h3cxnm7hczu';

function cazisCallback() {
  return fetch('https://richbum.ru/api/v1/callback', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}
module.exports = cazisCallback;
