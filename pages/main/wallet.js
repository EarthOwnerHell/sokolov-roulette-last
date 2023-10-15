const { dbUser } = require("../../database/managers/user")
const { numberWithSpace, getEarnedMoney, getEarnedRubs } = require("../../tools")

const { withdraw, payment } = require('../../settings/photos/wallet.json')
const dbGlobal = require("../../database/managers/global")
const { vkHelp } = require("../../settings/vk")

const addCarouselElement = ({ title, description, buttons, photo_id }) => ({
    title,
    description,
    buttons,
    photo_id
})

const getElement = (name, desc, buttons, photo_id) => ({
    title: name,
    buttons: buttons,
    description: desc,
    photo_id
})

module.exports = async (msg) => {
    const [ globalInfo, userInfo ] = await Promise.all([dbGlobal.get(), dbUser.get(msg.senderId, { balancesInfo: 1, lastGetEarn: 1, privilegeLvL: 1, nickname: 1 })])

    const { balancesInfo: { main, invest, rub }, lastGetEarn, privilegeLvL, nickname } = userInfo
    const { depCourse, hackPercent } = globalInfo

    const chooseActionCarousel = JSON.stringify({
        type: 'carousel',
        elements: [
            addCarouselElement(
                getElement('⬆️ Пополнить', `💵 Баланс: ${numberWithSpace(main)} $\n\n📉 ${numberWithSpace(depCourse)} $ = 1₽`, [
                    {
                        action: {
                            type: 'open_link',
                            label: "⬆️ Пополнить",
                            link: `${process.env.PAYMENT_LINK}`
                        }
                    }
                ], payment)
            ),
            addCarouselElement(
                getElement('⬇️ Вывод на QIWI', `💵 Баланс: ${numberWithSpace(main)} $\n\n⌛ На вывод: ${numberWithSpace(getEarnedRubs(lastGetEarn, invest, privilegeLvL, hackPercent, depCourse) + rub)}₽`, [
                    {
                        action: {
                            type: 'callback',
                            label: '⬇️ Вывод на QIWI',
                            payload: {
                                command: 'withdrawMoney',
                                type: 'user'
                            }
                        }
                    }
                ], withdraw)
            )
        ]
    });

    msg.send(`💳 ${privilegeLvL ? nickname : await vkHelp.getName(msg.senderId)}, ваш кошелек`, {
        template: chooseActionCarousel
    })

}