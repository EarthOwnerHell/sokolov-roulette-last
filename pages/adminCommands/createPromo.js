const { setBuyCourse } = require('../../database/managers/global');
const { plusBalanceUser } = require('../../database/managers/user');
const { vk, getId, questionManager } = require('../../settings/vk');
const { formClick, numberWithSpace } = require('../../settings/tools');
const promo = require('../../database/managers/promo');

vk.updates.use(questionManager.middleware);

module.exports = newPromo = async (msg) => {
    const newPromoQuestion = await msg.question('Введите название нового промокода:');

    const newPromo = newPromoQuestion.text;

    const checkPromo = await promo.get(newPromo);

    if (checkPromo) return msg.send(`Промокод уже существует`);

    const amountOfUsingQuestion = await msg.question('Введите кол-во использований:');

    const amountOfUsing = amountOfUsingQuestion.text
    
    const amountForPromoQuestion = await msg.question('Введите кол-во валюты за промо:');

    const amountForPromo = amountForPromoQuestion.text

    if((!Number(amountOfUsing) || Number(amountOfUsing) < 0) || (!Number(amountForPromo) || Number(amountForPromo) < 0)) return msg.send('Что-то не то')

    const newPromoCreate = await promo.create(newPromo, amountOfUsing, amountForPromo);

    return msg.send(`Новый промокод!\n\nНазвание: ${newPromo}\nКол-во применений: ${amountOfUsing}\nСумма: ${numberWithSpace(amountForPromo)}`);

};
