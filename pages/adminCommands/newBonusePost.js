const repost = require("../../database/managers/repost")

module.exports = async (msg) => {

    const postId = await msg.question('Введите айди поста:')

    if (!Number(postId.text)) return msg.send('Неверно')

    const bonuseAmount = await msg.question('Количество денег за репост:')

    if (!Number(bonuseAmount.text) || Number(bonuseAmount.text) <= 0) return msg.send('Неее')

    const isHaveRepost = await repost.get(Number(postId.text))

    if (isHaveRepost) repost.deleteBonuseForRepost(Number(postId.text))

    msg.send('Успешно')

    repost.offOldReposts().then(() => {
        repost.add({
            postId: Number(postId.text),
            bonuseAmount: Number(bonuseAmount.text)
        })
    })

}
