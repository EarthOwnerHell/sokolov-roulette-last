const { setBuyCourse } = require('../../database/managers/global');
const { plusBalanceUser } = require('../../database/managers/user');
const { vk, getId, questionManager } = require('../../settings/vk');
const { formClick, numberWithSpace } = require('../../settings/tools');

vk.updates.use(questionManager.middleware);

module.exports = giveBan = async (msg) => {
    const newCourse = await msg.question('Напиши новый курс, черт');

    msg.send(`Успешно сменили курс на ${numberWithSpace(Number(newCourse.text))}`);

    setBuyCourse(Number(newCourse.text))
};
