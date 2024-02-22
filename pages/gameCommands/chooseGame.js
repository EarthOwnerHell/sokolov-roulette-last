const { groupsCarousel } = require('../../keyboards/carousels');
const { getRandomId } = require('vk-io');

module.exports = chooseGame = async (msg) => {
  msg.send({
    message: '🤑 Показываю ссылки на наши официальные игровые беседы…',
    template: groupsCarousel,
    random_id: getRandomId(),
  });
};
