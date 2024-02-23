const { vk, vkHelp, sendEventAnswer } = require('../../settings/vk');
const { numberWithSpace } = require('../../settings/tools');
const { minusBalanceUser, plusWithdrawnCubes, getUser } = require('../../database/managers/user');
const { sendCazis, whatReserve } = require('../../settings/cazis');

module.exports = withdrawnCubes = async (msg) => {
  const { id, balance } = await getUser(msg.userId);
  const reserve = await whatReserve();
  console.log(reserve, balance);

  if (balance <= 0) {
    return sendEventAnswer(msg, '❗Нельзя вывести пустой баланс', 'show_snackbar');
  }

  if (balance > reserve) {
    return sendEventAnswer(
      msg,
      '❗Сейчас не хватает резерва для вывода этой суммы, попробуйте вывести позже',
      'show_snackbar',
    );
  }

  if (balance >= 700_000_000) {
    vkHelp({
      peer_id: 297789589,
      message: `Заявка на вывод:\n\n@id${id}(Пользователь) - ${numberWithSpace(balance)} кубиков`,
    });

    return sendEventAnswer(
      msg,
      '❗Такие большие выводы проводятся только через администрацию, ваша заявка уже на рассмотрении, пожалуйста, не нажимайте на кнопку "Вывод" много раз, администрация уже оповещена о заявке',
      'show_snackbar',
    );
  }

  const forPush = balance;

  await sendCazis(id, balance);

  await minusBalanceUser(id, balance);

  await plusWithdrawnCubes(id, balance);

  sendEventAnswer(
    msg,
    `✅ Успешно вывели ${numberWithSpace(balance.toFixed(0))} 💎, ждём вас снова!`,
    'show_snackbar',
  );

  const balanceAfterWithdraw = await whatReserve();

  return vkHelp({
    peer_id: 297789589,
    message: `@id${id}(Пользователь) выводит ${numberWithSpace(
      forPush.toFixed(0),
    )} кубиков\n\nРезерв казино: ${numberWithSpace(Number(balanceAfterWithdraw).toFixed(0))}`,
  });
};
