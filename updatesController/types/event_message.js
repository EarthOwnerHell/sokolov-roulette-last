const { createUser, getUser } = require('../../database/managers/user');
const eventManager = require('../../managers/eventManager');
const { getVkNameById } = require('../../settings/vk');

module.exports = async (ctx) => {
    console.log(ctx)
    const userId = ctx.userId;

    const user = await getUser(userId)

    const name = await getVkNameById(userId)

    if (!user) await createUser({
        id: userId,
        name: name,
        refferer: ctx.refferalValue,
    });
    try {
        const command = ctx.eventPayload.command
        console.log(command)
        if (command) eventManager(ctx); 
    } catch { }
}