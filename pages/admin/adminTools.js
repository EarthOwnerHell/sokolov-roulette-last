const { createCollectIterator } = require('vk-io');
const noButtonBoard = require('../../keyboards/inline/acceptMailing.js');

const { api } = require('../../settings/vk.js')

const adminHelper = {
    getPeoplesToMailing: async () => {
        let users = [];
    
        const iterator = createCollectIterator({
            api,
            method: 'messages.getDialogs',
            countPerRequest: 100,
            parallelRequests: 25,
            retryLimit: 5,
        });
    
        for await (const chunk of iterator) {
            users.push(...chunk.items);
        }
        
        users = users.filter(item => item.message.user_id > 0).map((item) => item.message.user_id)

        return users
    },
    getTextForMailing: async (msg) => {
        const textForMailing = await msg.question(`Начали сбор людей для рассылки. Напишите текст для рассылки. (Для отправки поста перешлите его в этот диалог, для фото просто прикрепите его)`);

        let attAdd = [];

        if (textForMailing.attachments) {
            textForMailing.attachments.forEach((att) => {
                attAdd.push(String(att));
            });
        }
        
        const newArr = attAdd.join(',');

        msg.send(`Подтвердите начало рассылки`, {
            keyboard: noButtonBoard
        })
    
        const acceptMailing = await msg.question(textForMailing.text, {
            attachment: newArr,
        })
    
        if (acceptMailing.text.toLowerCase() !== 'подтвердить') {
            msg.send('Рассылка отменена');
            return {
                textForMailing: null,
                media: null
            }
        }

        msg.send('🤖 Бот уведомит о начале рассылки.')

        return {
            textForMailing: textForMailing.text,
            media: newArr
        }
    }
}

module.exports = {
    adminHelper
}
