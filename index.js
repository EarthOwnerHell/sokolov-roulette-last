require('dotenv').config();

const { vk, vkHelp } = require('./settings/vk.js')

const connectMongo = require('./database/connect.js');

const serverListener = require('./keksik')

const updatesController = require('./settings/vkUpdates/controller.js');

const dbGlobal = require('./database/managers/global.js');

const checkGameResults = require('./pages/game/helpers/getResults.js')

const { getUserTimeReg } = require('./tools.js');

connectMongo()

serverListener()

checkGameResults()

dbGlobal.add()

// Проверка на фейк, дата реги < 14 дней

vk.updates.use(async (ctx, next) => {

    const userId = ctx?.fromId || ctx?.likerId || ctx?.senderId || ctx?.userId

    if (userId <= 0) return;

    const accessToBot = await getUserTimeReg(userId)

    if (!accessToBot) return vkHelp.msg({
        peer_id: userId,
        message: '😓 Бот распознал ваш аккаунт как непригодный для игры (недавно созданный).\n\n✅ Чтобы пользоваться ботом, пожалуйста, зайдите со своего основного аккаунта'
    })

    return next()
})

vk.updates.on(['message_new', 'wall_reply', 'like', 'wall_repost', 'group_leave', 'group_join', 'message_event', 'group_join', 'group_leave'], updatesController)

vk.updates.start()
    .catch(console.error)
    .then(console.log('[ 🔔 ] Бот работает'))