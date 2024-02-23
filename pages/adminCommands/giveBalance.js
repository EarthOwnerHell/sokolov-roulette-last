const { set } = require('express/lib/application');
const { plusBalanceUser } = require('../../database/managers/user');
const { vk, questionManager, getId } = require('../../settings/vk');
const { formClick, numberWithSpace } = require('../../settings/tools');

vk.updates.use(questionManager.middleware);

module.exports = async (msg) => {
  const userUrl = await msg.question('Вставьте ссылку на профиль');

  const userId = await getId(userUrl.text);

  if (!userId.id || userId.type !== 'user') return msg.send('Ошибка, проверь вводимые данные');

  const plusBalance = await msg.question(
    'Введите сумму, которую надо прибавить. (Для вычитания добавь перед числом минус)',
  );

  msg.send(
    `Успешно выдали ${formClick(userId.id, 'челу')} балик в размере ${numberWithSpace(
      Number(plusBalance.text),
    )}`,
  );
  msg.send(userId.id, `😳 Вам было выдано ${numberWithSpace(Number(plusBalance.text))} Caz!`);

  plusBalanceUser(userId.id, Number(plusBalance.text));
};
