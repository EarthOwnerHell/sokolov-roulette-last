const md5 = require('md5')
const crypto = require('../../settings/tools')

const createSecretWord = (textForHashing, password) => {
    const algorithm = 'aes-192-cbc'

    const key = crypto.scryptSync(password, 'salt', 24)
    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(algorithm, key, iv)

    const encryptedText = cipher.update(textForHashing, 'utf8', 'hex') + cipher.final('hex');

    return `${textForHashing}|${encryptedText}`
}

const createHash = (secretWord) => md5(secretWord)

module.exports = {
    createHash,
    createSecretWord
}

/*const secretWord = createSecretWord(`${winNumber}|${winColor}`, 'blackjack')

const hash = createHash(secretWord);
*/