const crypto = require('crypto');
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
  { name: 1, percentage: 17 },
  { name: 2, percentage: 17},
  { name: 3, percentage: 17 },
  { name: 4, percentage: 17 },
  { name: 5, percentage: 17 },
  { name: 6, percentage: 17 },
];
const b = 100

a = {}

for (let i = 0; i < b; i++){
  const randomValue = getRandomValueByPercentage(values);
  console.log(randomValue)
}

console.log(a)