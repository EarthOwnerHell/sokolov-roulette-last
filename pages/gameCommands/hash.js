const md5 = require('md5');
const crypto = require('crypto');

const createSecretWord = (textForHashing, password) => {
    const algorithm = 'aes-192-cbc'

    const key = crypto.scryptSync(password, 'salt', 24)
    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(algorithm, key, iv)

    const encryptedText = cipher.update(textForHashing, 'utf8', 'hex') + cipher.final('hex');

    return `${encryptedText}`
}

function getRandomValue(min, max) {
    const range = max - min + 1;
    const randomBytes = crypto.randomBytes(4);
    const randomNumber = Math.floor(
    (randomBytes.readUInt32LE() / 0xffffffff) * range
    ) + min;
    return randomNumber;
    }

const createHash = (secretWord) => md5(secretWord)

module.exports = {
    createHash,
    createSecretWord,
    getRandomValue
}

/*const secretWord = createSecretWord(`${winNumber}|${winColor}`, 'blackjack')

const hash = createHash(secretWord);
*/