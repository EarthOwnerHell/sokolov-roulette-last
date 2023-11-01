const { VK } = require('vk-io');
const connectDb = require('./database/connect');
//const newDonate = require('./settings/keksik.js');
const { token, groupId } = require('./settings/config.json')
const { vkDice, vkDiceCallback } = require('./settings/vkdice')
const schedule = require('node-schedule');
const updatesManager = require('./updatesController/updatesManager')
const { vk } = require('./settings/vk');
const { autoCreateGlobal } = require('./database/managers/global');
const { resetLossWin, getUserTimeReg } = require('./settings/tools');
const serverListen = require('./settings/server');
const checkResults = require('./pages/gameCommands/getResults.js');
const { resetDayTopers } = require('./database/managers/user');

//serverListen()

connectDb();

autoCreateGlobal();

const resetSchedule = schedule.scheduleJob({ hour: 16, minute: 11 }, () => {
    resetLossWin();
    resetDayTopers()
  });

  vk.updates.use(async (ctx, next) => {

    const userId = ctx?.fromId || ctx?.likerId || ctx?.senderId || ctx?.userId

    if (userId <= 0) return;

    const accessToBot = await getUserTimeReg(userId)

    if (!accessToBot) return msg(userId,'😓 Бот распознал ваш аккаунт как непригодный для игры (недавно созданный).\n\n✅ Чтобы пользоваться ботом, пожалуйста, зайдите со своего основного аккаунта')

    return next()
})

vk.updates.on(['message_new', 'wall_reply', 'like', 'wall_repost', 'group_leave', 'group_join', 'message_event', 'group_join', 'group_leave', 'chat_invite_user'], updatesManager)

vk.updates.start().then(console.log('--> Бот запущен.'));

/*
vkDice.api.api.callback({ callback: "https://blackjack-server.online"}).then(console.log).catch(console.error);

vkDiceCallback.on(event => plusCubics(event.from_user, event.amount))
vkDiceCallback.start(443, '91.222.238.81').then(console.log('--> VKDice Callback работает')).catch(console.error);
*/
module.exports = {
    vkDice
}
