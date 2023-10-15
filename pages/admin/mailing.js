const { getRandomId } = require("vk-io")
const { getAdmins } = require("../../database/managers/user")
const { vk } = require("../../settings/vk")
const { numberWithSpace, processArray, getConvertedArray } = require("../../tools")
const { adminHelper } = require("./adminTools")


module.exports = async (msg) => {

    let [peoples, mailingInfo] = await Promise.all([adminHelper.getPeoplesToMailing(), adminHelper.getTextForMailing(msg)])

    if (!mailingInfo.textForMailing) return;

    msg.send(`⚙ Рассылка запустится в ближайшие секунды.\n\n👥 Количество человек для рассылки: ${numberWithSpace(peoples.length)}\n\n🤖 После ее завершения мы оповестим вас.`)
    
    let countPeoples = peoples.length

    peoples = getConvertedArray(peoples);

    const adminsId = await getAdmins()

    function vkMsg(peer_ids) {
        vk.api.messages
            .send({
                peer_ids,
                message: mailingInfo.textForMailing,
                attachment: mailingInfo.media,
                random_id: getRandomId(),
            })
            .then((res) => {
                console.log('[ 🤖 ] Разослали 100 сообщений.')
            })
            .catch((e) => {
                console.log(e);
            });
    }

    processArray({ 
        items: peoples, 
        process: vkMsg, 
        delay: 1_000, 
        adminsId: adminsId, 
        countUsers: countPeoples
    })

}