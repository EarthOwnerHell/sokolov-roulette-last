const like = require('../../database/managers/like');
const repost = require('../../database/managers/repost');
const { plusBalanceUser } = require('../../database/managers/user');
const { numberWithSpace } = require('../../settings/tools');
const { vkHelp } = require('../../settings/vk');

module.exports = async (msg) => {
  const { likerId, subTypes, objectId, objectType } = msg;

  if (objectType !== 'post') return;

  let likePost = await like.get(objectId);

  const bonuseForRepost = await repost.get(objectId);

  let amountForLike = 10000;

  if (!likePost) {
    likePost = await like.add(objectId);
  }

  if (!bonuseForRepost?.active) {
    amountForLike = 1000;
  }

  if (likePost.likers.includes(likerId) && subTypes[0] === 'like_add')
    return vkHelp({
      peer_id: likerId,
      message: `😍 Мы ценим твою активность, но ты уже поставил лайк на этот пост!\n\n⚡ Не расстраивайся, ставь ❤ на другие посты!`,
    });

  if (likePost.likers.includes(likerId)) return;

  if (subTypes[0] === 'like_add') {
    like.addLiker(objectId, likerId);

    vkHelp({
      peer_id: likerId,
      message: `😍 Спасибо за лайк, на ваш баланс начислено ${numberWithSpace(amountForLike)} Caz`,
    });
    await plusBalanceUser(likerId, amountForLike);

    console.log(`\n[ 🔔 ] Лайк от: https://vk.com/id${likerId}`);
  }

  if (subTypes[0] === 'like_remove') {
    vkHelp({
      peer_id: likerId,
      message: `🥺 Вы убрали лайк, нам пришлось снять с вашего баланса ${amountForLike} Caz`,
    });
    console.log(`\n[ 🔔 ] Удалил лайк: https://vk.com/id${likerId}`);
  }
};
