const dbGlobal = require("../../database/managers/global");
const { dbUser } = require("../../database/managers/user");
const lvlOfRefsMenu = require("../../keyboards/inline/lvlOfRefsMenu");
const { vkHelp } = require("../../settings/vk");
const { getProcentForUserFromRef, numberWithSpace, getDeclining } = require("../../tools");

/* 
    Create short info about ref's user

    @param msg - message context, includes sender id

    @returns { promise } - event answer

    @type { msg: object } => promise
*/

module.exports = async (msg) => {
    const userId = msg.userId;

    const [userRefLink, user, { refBonuse }] = await Promise.all([ vkHelp.getRef(userId), dbUser.get(userId, { refs: 1, privilegeLvL: 1 ,nickname: 1 }), dbGlobal.get()]);

    const { count } = user.refs

    const { privilegeLvL, nickname } = user;

    const { text, needUpgrade } = getProcentForUserFromRef(count)

    vkHelp.msg({ 
        peer_id: userId, 
        message: `🎁 ${privilegeLvL ? nickname : await vkHelp.getName(userId)}, реферальная программа\n\n🎯 Приглашайте друзей, мы платим за каждого реферала:\n\n🤑 ${numberWithSpace(refBonuse)} $ на баланс\n\n💡 За каждые 15 рефералов мы дарим бизнес\n\n🔗 Ссылка для приглашения:\n\n[ ${userRefLink} ] (${text})`, 
        keyboard: lvlOfRefsMenu 
    })

    return vkHelp.sendEventAnswer({ 
        event_id: msg.eventId, 
        user_id: msg.userId, 
        peer_id: msg.peerId, 
        text_event_data: `👀 У вас ${numberWithSpace(count)} ${getDeclining(count, ['реферал','реферала','рефералов'])}`
    })
}