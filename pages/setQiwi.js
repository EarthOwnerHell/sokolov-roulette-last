const parseNumber = require('libphonenumber-js');
const { isValidPhoneNumber } = require('libphonenumber-js');
const { dbUser } = require('../database/managers/user');

module.exports = async (msg) => {
    const changeTo = await msg.question(
        '📝 Пожалуйста, укажи номер\n📝 Формат - +XXXXXXXXXXX'
    );

    const phoneNumber = await parseNumber(changeTo.text);
    let checkNumber;
    try {
        checkNumber = await isValidPhoneNumber(
            changeTo.text,
            phoneNumber.country
        );
    } catch { }

    if (!phoneNumber?.country || !checkNumber) {
        return msg.send('💔 Какой-то у тебя неправильный\nномер.');
    }

    dbUser.setQiwiPhone(msg.senderId, changeTo.text)

    msg.send('💚 Ты успешно сменил номер');
};