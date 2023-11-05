const { vk, questionManager, vkHelp } = require('../../settings/vk');
const { numberWithSpace, translateGroupTypes } = require('../../settings/tools');
const promo = require('../../database/managers/promo');
const chat = require('../../database/managers/chat');

vk.updates.use(questionManager.middleware);

module.exports = changeGroupType = async (msg) => {
    const groupIdAsk = await msg.question('Введите peerId беседы:');

    const groupId = groupIdAsk.text;

    const checkGroup = await chat.getChat(groupId);

    if (!checkGroup) return msg.send(`Беседы не существует`);

    const groupTypeQuestion = await msg.question('Введите новый статус беседы (official, standart, vip, premium):');

    const groupType = groupTypeQuestion.text

    const newGroupType = await chat.setGroupType(groupId, groupType);

    msg.send(`Поменяли тип беседы на ${groupType}`)

    return vkHelp({peer_id: groupId, message: `❕ Уважаемые админы беседы!\n\n🔥 Статус этой беседы был изменён на «${translateGroupTypes[groupType]}»`})

};
