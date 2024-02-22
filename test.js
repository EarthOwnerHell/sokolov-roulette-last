/*const crypto = require('crypto');
const { numberWithSpace } = require('./settings/tools');

function getRandomValueByPercentage(values) {
  const sumOfPercentages = values.reduce((sum, value) => sum + value.percentage, 0);

  // Генерируем рандомное число от 0 до суммы процентов
  const randomNum = crypto.randomInt(0, sumOfPercentages);

  // Проходимся по значениям и суммируем проценты
  let cumulativePercentage = 0;
  for (const value of values) {
    cumulativePercentage += value.percentage;

    // Если рандомное число попадает в текущий диапазон процентов,
    // то выбираем это значение
    if (randomNum < cumulativePercentage) {
      return value.name;
    }
  }
}

// Пример использования
const values = [
        { name: 1, percentage: 3 },
        { name: 2, percentage: 3 },
        { name: 3, percentage: 3 },
        { name: 4, percentage: 3 },
        { name: 5, percentage: 3 },
        { name: 6, percentage: 3 },
        { name: 7, percentage: 3 },
        { name: 8, percentage: 3 },
        { name: 9, percentage: 3 },
        { name: 10, percentage: 3 },
        { name: 11, percentage: 3 },
        { name: 12, percentage: 3 },
        { name: 13, percentage: 3 },
        { name: 14, percentage: 3 },
        { name: 15, percentage: 3 },
        { name: 16, percentage: 3 },
        { name: 17, percentage: 3 },
        { name: 18, percentage: 3 },
        { name: 19, percentage: 3 },
        { name: 20, percentage: 3 },
        { name: 21, percentage: 3 },
        { name: 22, percentage: 3 },
        { name: 23, percentage: 3 },
        { name: 24, percentage: 3 },
        { name: 25, percentage: 3 },
        { name: 26, percentage: 3 },
        { name: 27, percentage: 3 },
        { name: 28, percentage: 3 },
        { name: 29, percentage: 3 },
        { name: 30, percentage: 3 },
        { name: 31, percentage: 3 },
        { name: 32, percentage: 3 },
        { name: 33, percentage: 3 },
        { name: 34, percentage: 3 },
        { name: 35, percentage: 3 },
        { name: 36, percentage: 3 }
];
const b = 100

a = {}

for (let i = 0; i < b; i++){
  const randomValue = getRandomValueByPercentage(values);
  console.log(randomValue)
}

console.log(a)
*/
// Создаем новый объект XMLHttpRequest
var token = 'sfuur7t6m1tw9jioj7al3h3cxnm7hczu';

fetch('https://richbum.ru/api/v1/callback', {
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

axios
  .post(url, data, { headers })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
