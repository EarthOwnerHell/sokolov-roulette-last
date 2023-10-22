const shopCarousel = require("../../keyboards/carousels");
const { getRandomId } = require('vk-io')

module.exports = shop = async (msg) => {
    msg.send({ message: '🏪 Выбирай раздел: ', template: shopCarousel, random_id: getRandomId() })

}
