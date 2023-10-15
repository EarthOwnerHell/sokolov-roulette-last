const { VK, getRandomId, resolveResource } = require('vk-io')
const { QuestionManager } = require('vk-io-question')

const vk = new VK({
   token: process.env.GROUP_TOKEN,
   pollingGroupId: process.env.GROUP_ID,
   apiLimit: 20,
   apiMode: 'parallel'
})

const questionManager = new QuestionManager()

const { api } = vk;

vk.updates.use(questionManager.middleware)

const getShortLink = async (url) => {
    const { short_url } = await api.utils.getShortLink({ url: url })

    return short_url
}

const getInfoUser = async (id) => {
    const [data] = await api.users.get({
        user_ids: id,
    });

    return data
}

const vkHelp = {
    msg: ({ peer_id, message, attachment, keyboard, template }) => {

        const payloadMsg = {
            message,
            attachment,
            keyboard,
            template,
            random_id: getRandomId()
        }

        typeof peer_id !== 'object' ? payloadMsg.peer_ids = peer_id : payloadMsg.peer_id = peer_id

        api.messages.send(payloadMsg).catch((res) => console.log('❗ Что-то пошло не так, не отправили сообщение', res))

    },
    getRef: async (userId) => {
        const short_url = await getShortLink(`vk.me/${process.env.GROUP_SHORTNAME}?ref=${userId}`)

        return short_url
    },
    sendEventAnswer: ({ event_id, user_id, peer_id, text_event_data }) => {
        const data = {
            event_id,
            user_id,
            peer_id,
        }

        if (text_event_data) {
            data.event_data = JSON.stringify({
                'type': 'show_snackbar',
                'text': text_event_data
            })
        }

        api.messages.sendMessageEventAnswer(data).catch(() => {
            vkHelp.msg({
                peer_id: peer_id,
                message: text_event_data,
            })
            
            console.log('❗ Что-то пошло не так, не отправили уведомление, кинули сообщение')
        })
    },
    getName: async (userId) => {
        const { first_name } = await getInfoUser(userId)

        return first_name
    },
    getLastName: async (id) => {
        const { last_name } = await getInfoUser(id)

        return last_name
    },
    getIdByLink: async (resource) => await resolveResource({  api, resource, }).catch(() => {}),
    messageEdit: async ({ peer_id, message_id, message, keyboard, template, attachment }) => {

        api.messages.edit({
            peer_id,
            message_id,
            message,
            keyboard,
            template,
            attachment,
        }).catch(() => {
            message += `\n\n❗ Что-то пошло не так, отправили вам сообщение`

            vkHelp.msg({ peer_id, message, keyboard, template })
        })

    },
    getLastBotMessage: async (userId) => {
        const { items } = await api.messages.getHistory({
            count: 1,
            user_id: userId,
            peer_id: userId,
            start_message_id: -1,
        })

        const { id } = items[0]

        return id
    },
}

module.exports = {
    vk,
    vkHelp,
    questionManager,
    api
}
