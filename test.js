const crypto = require('crypto')

function getRandomValueByPercentage(values) {
  // Считаем сумму всех процентов
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
  { name: '2X', percentage: 50 },
  { name: '3X', percentage: 35 },
  { name: '5X', percentage: 12 },
  { name: '10X', percentage: 3 }
];

const b = 10000
let stats = {
  '2X' : 0,
  '3X' : 0,
  '5X' : 0,
  '10X' : 0
}

for (let i = 0; i < b; i++){
  const randomValue = getRandomValueByPercentage(values);
  stats[randomValue] += 1

}


console.log(`Результат ${b} игр:\n\n2X выпал ${stats['2X']} раз\n3X выпал ${stats['3X']} раз\n5X выпал ${stats['5X']} раз\n10X выпал ${stats['10X']} раз`);
