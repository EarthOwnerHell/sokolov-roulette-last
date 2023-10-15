const { dbUser } = require('../../database/managers/user')
const photoAvatars = require('../../settings/photos/avatars.json')
const { vkHelp } = require('../../settings/vk')

const addCarouselElement = ({ title, description, buttons, photo_id }) => ({
    title,
    description,
    buttons,
    photo_id
})

const getButtonsArray = (payload) => ([
    {
        action: {
            type: 'callback',
            label: '🎭 Выбрать персонажа',
            payload: {
                command: payload,
                type: 'setAvatar'
            }
        }
    }
])

const getElement = (name, desc, buttons, photo_id) => ({
    title: name,
    buttons: buttons,
    photo_id,
    description: desc,
})

/* 
    {
        label: 'Имя страницы',
        description: 'Описание',
        command: 'Пейлоад'
    },
*/

const arr = [
    {
        label: 'Рокки',
        description: 'Прирожденная звезда',
        command: '1'
    },
    {
        label: 'Элвин',
        description: 'Леприкон',
        command: '2'
    },
    {
        label: 'Салли',
        description: 'Любит общаться',
        command: '3'
    },
]

module.exports = async (msg) => {

    const { privilegeLvL, nickname } = await dbUser.get(msg.senderId, { privilegeLvL: 1, nickname: 1 })

    const chooseActionCarousel = JSON.stringify({
        type: 'carousel',
        elements: arr.map(({ label, description, command }, index) => {
            return addCarouselElement(
                getElement(label, description, getButtonsArray(command), photoAvatars[index+1])
            )
        }),
    });

    msg.send(`🎭 ${privilegeLvL ? nickname : await vkHelp.getName(msg.senderId)}, персонажи`, {
        template: chooseActionCarousel
    })

}
