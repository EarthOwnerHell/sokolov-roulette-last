const mainMenu = require('../../../keyboards/usual/main.js')
const getUnban = require('../../../keyboards/inline/getUnban.js');

const sendPayloadToManager = require('../../../managers/payload.js');

const giveBalance = require('../../../pages/admin/giveBalance.js');
const gameMenu = require('../../../keyboards/usual/gameMenu.js');

const { dbUser } = require("../../../database/managers/user");

const { vkHelp } = require('../../vk.js');

const a = false;

module.exports = async (ctx) => {
    
    const user = await dbUser.get(ctx.senderId, { id: 1, admin: 1, ban: 1 });

    if (a && !user?.admin) return;

    if (user?.ban === 2 && ctx.senderId !== 222856843 && !ctx.isChat) return ctx.send('🐓 Ваш аккаунт заблокирован.', {
        keyboard: getUnban
    })

    if (ctx?.text?.toLowerCase() === 'выдать баланс' && [584133278, 434328481].includes(ctx.senderId) && !ctx.isChat) return giveBalance(ctx)
 
    if (!user) return dbUser.add({ id: ctx.senderId, referrer: ctx.referralValue, name: `${await vkHelp.getName(ctx.senderId)}` })

    if (['меню', 'начать', 'старт'].includes(ctx?.text?.toLowerCase()) && !ctx.isChat) return ctx.send('Главное меню', {
        keyboard: mainMenu(user.admin)
    })

    if (['активе туре', 'о казик приди', 'алишер великий абобус, верни казик!'].includes(ctx?.text?.toLowerCase()) && user?.admin) return ctx.send('О, величайший, держите казик', {
        keyboard: gameMenu()
    })
    
    if (ctx?.text?.toLowerCase() === 'рабовод2022') return ctx.send('Промо: MiningMoney2022\nСумма: 30.000 VK Coin\nАктиваций: 100\n\n❗ Отправь название промокода в Рабовод и получи бонус!', {
        attachment: 'photo-210860036_457241470'
    })
    
    try {
        const command = Object.values(ctx.messagePayload)[1]

        if (command) sendPayloadToManager(ctx);
    } catch { }

}
