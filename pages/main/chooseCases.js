
const { dbUser } = require('../../database/managers/user')
const photoCases = require('../../settings/photos/cases.json')
const { vkHelp } = require('../../settings/vk')
const { numberWithSpace } = require('../../tools')


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
            label: '💰 Купить',
            payload: {
                command: payload,
                type: 'buyCase'
            }
        }
    }
])

const getElement = (name, desc, buttons, photo_id) => ({
    title: name,
    buttons: buttons,
    description: desc,
    photo_id
})

/* 
    {
        label: 'Имя страницы',
        description: 'Описание',
        command: 'Пейлоад'
    },
*/

const checkDiscount = (privilege, price) => privilege >= 2 ? price - (price * 0.1) : price

const arr = [
    {
        label: 'Игровой кейс',
        description: (privilege) => `Цена: ${numberWithSpace(checkDiscount(privilege, 99_999))} $`,
        command: 'game'
    },
    {
        label: 'Морской кейс',
        description: (privilege) => `Цена: ${numberWithSpace(checkDiscount(privilege, 249_999))} $`,
        command: 'sea'
    },
    {
        label: 'Радиоактивный кейс',
        description: (privilege) => `Цена: ${numberWithSpace(checkDiscount(privilege, 499_999))} $`,
        command: 'radioactive'
    },
    {
        label: 'Ведьмак кейс',
        description: (privilege) => `Цена: ${numberWithSpace(checkDiscount(privilege, 799_999))} $`,
        command: 'witcher'
    },
    {
        label: 'Злой кейс',
        description: (privilege) => `Цена: ${numberWithSpace(checkDiscount(privilege, 999_999))} $`,
        command: 'angry'
    },
]

module.exports = async (msg) => {

    const { privilegeLvL, nickname } = await dbUser.get(msg.senderId, { privilegeLvL: 1, nickname: 1 })

    const chooseActionCarousel = JSON.stringify({
        type: 'carousel',
        elements: arr.map(({ label, description, command }, index) => {
            return addCarouselElement(
                getElement(label, description(privilegeLvL), getButtonsArray(command), photoCases[index])
            )
        }),
    });

    msg.send(`💸 ${privilegeLvL ? nickname : await vkHelp.getName(msg.senderId)}, кейсы`, {
        template: chooseActionCarousel
    })

}
