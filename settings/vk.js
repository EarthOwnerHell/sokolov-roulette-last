const { VK, getRandomId, resolveResource } = require('vk-io');
const { token } = require('./config.json')
const { QuestionManager } = require('vk-io-question');
const gameKeyboard = require('../pages/gameCommands/gameTools');

const vk = new VK({
    token
})

const questionManager = new QuestionManager();

const { api } = vk

const vkHelp = ({ peer_id, message, attachment, keyboard, template }) => {

        const payloadMsg = {
            message,
            attachment,
            keyboard,
            template,
            random_id: getRandomId()
        }

        typeof peer_id !== 'object' ? payloadMsg.peer_ids = peer_id : payloadMsg.peer_id = peer_id

        api.messages.send(payloadMsg).catch((res) => console.log('❗ Что-то пошло не так, не отправили сообщение', res))
}
const msg = (props) => {

    const { peer_id, message, attachment, keyboard } = props

    api.messages.send({
        peer_id,
        message,
        attachment,
        keyboard,
        random_id: getRandomId()
    })

}

const messageEdit = (props) => {
    let { peer_id, message_id, message, keyboard } = props

    api.messages.edit({
        peer_id,
        message_id,
        message,
        keyboard
    }).catch((e) => {
        console.log(e)
        message += `\n\n❗ Всё нормально, просто бот не смог отредактировать сообщение (проблемы с ВК), продолжайте играть.`

        msg({ peer_id, message })
    })

} 
const getLastBotMessage = async (peerId) => {
    const { items } = await api.messages.getHistory({
      count: 1,
      peer_id: peerId,
      start_message_id: -1,
    });
  
    const { id } = items[0];
  
    return id;
  };
  

const getVkNameById = async (id) => {
    const [data] = await api.users.get({
        user_ids: id,
    });
    return data.first_name;
}

const getId = async (resource) => await resolveResource({  api, resource, });

module.exports = {
    api,
    vk,
    vkHelp,
    msg,
    getVkNameById,
    questionManager,
    getId,
    messageEdit,
    getLastBotMessage,
}