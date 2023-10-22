const { getRandomId } = require('vk-io');
const { noButtonBoard /*,mailingMenu*/ }= require('../../keyboards/inline');
const { adminMenu } = require('../../keyboards/usual');
const { vk, questionManager } = require('../../settings/vk');
const { processArray, getConvertedArray } = require('../../settings/tools');

vk.updates.use(questionManager.middleware);

module.exports = mailing = async (msg) => {
    let offset = 0;
    let ready = false;

    let usersId = [];

    const getDialogs = async () => {
        const {count, items} = await vk.api.messages.getDialogs({
            count: 200,
            offset,
        });

        if (items.length > 0) {
            // items.forEach((user) => {
            //     if (!user) return;
            //     usersId.push(user.message.user_id);
            // });
            for (let i = 0; i < items.length; i++) {
                usersId.push(items[i].message.user_id)
            }
            offset += 200;
            getDialogs();
            return;
        }

        usersId = getConvertedArray(usersId);

        const question = await msg.question(
            `${count} чел\nВведите текст рассылки (Для отмены напишите ,,Отмена")`
        );

        let attAdd = [];

        if (question.attachments) {
            question.attachments.forEach((att) => {
                attAdd.push(String(att));
            });
        }

        const newArr = attAdd.join(',');

        msg.send('Подтвердите отправку', {
            keyboard: noButtonBoard,
        });

        const accept = await msg.question(question.text, {
            attachment: newArr,
            //keyboard: mailingMenu
        });

        if (accept.text.toLowerCase() !== 'подтвердить')
            return msg.send('Рассылка отменена');

        msg.send('Отправили', {
            keyboard: adminMenu,
        });

        function vkMsg(peer_ids) {
            vk.api.messages
                .send({
                    peer_ids,
                    message: question.text,
                    attachment: newArr,
                    //keyboard: mailingMenu,
                    random_id: getRandomId(),
                })
                .then((res) => {
                    console.log('[ Рассылаем сообщения --> Успешно ]');
                })
                .catch((e) => {
                    console.log(e);
                });
        }

        processArray(usersId, vkMsg, 3000);
    };

    getDialogs();

    // const {count, items} = await vk.api.messages.getConversations('id')

    // let usersId = []

    // for (let i = 0; i < items.length; i++) {
    //     usersId.push(items[i].conversation.peer.id)
    // }
};
