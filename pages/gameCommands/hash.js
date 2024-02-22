const md5 = require('md5');
const crypto = require('crypto');

const createSecretWord = (textForHashing, password) => {
  const algorithm = 'aes-192-cbc';

  const key = crypto.scryptSync(password, 'salt', 24);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encryptedText = cipher.update(textForHashing, 'utf8', 'hex') + cipher.final('hex');

  return `${encryptedText}`;
};

function getRandomValue(min, max) {
  const range = max - min + 1;
  const randomBytes = crypto.randomBytes(4);
  const randomNumber = Math.floor((randomBytes.readUInt32LE() / 0xffffffff) * range) + min;
  return randomNumber;
}

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

const createHash = (secretWord) => md5(secretWord);

module.exports = {
  createHash,
  createSecretWord,
  getRandomValue,
  getRandomValueByPercentage,
};

/*const secretWord = createSecretWord(`${winNumber}|${winColor}`, 'blackjack')

const hash = createHash(secretWord);
*/
