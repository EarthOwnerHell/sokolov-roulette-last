const { createUser, getUser } = require('../../database/managers/user');
const userManager = require('../../managers/user');

module.exports = async (ctx) => {
    const userId = ctx.userId;

    const user = await getUser(userId)

    const name = await getVkNameById(userId)

    if (!user) await createUser({
        id: userId,
        name: name,
        refferer: ctx.refferalValue,
    });
    try {
        const command = Object.values(ctx.eventPayload)[1]
        
        if (command) userManager(ctx);
    } catch { }
}