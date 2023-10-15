const sendPayloadToManager = require('../../../managers/payload.js');

const { dbUser } = require("../../../database/managers/user");

const { vkHelp } = require("../../vk");

module.exports = async (ctx) => {
    const userId = ctx.userId;

    const user = await dbUser.get(userId, { id: 1 });

    if (!user) await dbUser.add({ id: userId, referrer: 0, name: await vkHelp.getName(userId) })

    try {
        const command = Object.values(ctx.eventPayload)[1]
        
        if (command) sendPayloadToManager(ctx);
    } catch { }
}