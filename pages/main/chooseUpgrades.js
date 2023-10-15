
const { dbUser } = require('../../database/managers/user')
const photoUpgrades = require('../../settings/photos/upgrades.json')
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
                type: 'buyUpgrades'
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

const checkDiscount = (privilege, price) => privilege == 2 ? price - (price * 0.1) : price

const arr = [
    {
        label: '🌭 Магазин Хот-догов',
        description: (privilege) => `📠 Цена: ${numberWithSpace(checkDiscount(privilege, 54_299))} $\n\n📚 Прибыль: 1.200$ в сутки`,
        command: 'buyFirstUpgrade'
    },
    {
        label: '☕ Магазин Кофе с собой',
        description: (privilege) => `📠 Цена: ${numberWithSpace(checkDiscount(privilege, 114_499))} $\n\n📚 Прибыль: 2.800$ в сутки`,
        command: 'buySecondUpgrade'
    },
    {
        label: '📒 Магазин Комиксов',
        description: (privilege) => `📠 Цена: ${numberWithSpace(checkDiscount(privilege, 234_999))} $\n\n📚 Прибыль: 6.700$ в сутки`,
        command: 'buyThirdUpgrade'
    },
    {
        label: '🍟 Доставка еды',
        description: (privilege) => `📠 Цена: ${numberWithSpace(checkDiscount(privilege, 417_999))} $\n\n📚 Прибыль: 13.500$ в сутки`,
        command: 'buyFourthUpgrade'
    },
    {
        label: '📦 Служба доставки',
        description: (privilege) => `📠 Цена: ${numberWithSpace(checkDiscount(privilege, 741_999))} $\n\n📚 Прибыль: 26.500$ в сутки`,
        command: 'buyFivthUpgrade'
    },
    {
        label: '🖥 Разработка VR-игр',
        description: (privilege) => `📠 Цена: ${numberWithSpace(checkDiscount(privilege, 999_999))} $\n\n📚 Прибыль: 41.000$ в сутки`,
        command: 'buySixUpgrade'
    },
]

module.exports = async (msg) => {
    const { privilegeLvL, nickname } = await dbUser.get(msg.senderId, { privilegeLvL: 1, nickname: 1 })

    const chooseActionCarousel = JSON.stringify({
        type: 'carousel',
        elements: arr.map(({ label, description, command }, index) => {
            return addCarouselElement(
                getElement(label, description(privilegeLvL), getButtonsArray(command), photoUpgrades[index])
            )
        }),
    });

    msg.send(`🎯 ${privilegeLvL ? nickname : await vkHelp.getName(msg.senderId)}, выберите бизнес`, {
        template: chooseActionCarousel
    })

}