const repost = require("../../database/managers/repost")

module.exports = async (msg) => {

    const postId = await msg.question('Введите айди поста.\n\nПример: https://vk.com/defanystudio?w=wall-196719351_1542\n\nАйди будет 1542, писать его')

    if (!Number(postId.text)) return msg.send('не')

    const bonuseAmount = await msg.question('Введите скок деняк за репост')

    if (!Number(bonuseAmount.text) || Number(bonuseAmount.text) <= 0) return msg.send('Неее')

    const isHaveRepost = await repost.get(Number(postId.text))

    if (isHaveRepost) repost.deleteBonuseForRepost(Number(postId.text))

    msg.send('успешно амогусик')

    repost.offOldReposts().then(() => {
        repost.add({
            postId: Number(postId.text),
            bonuseAmount: Number(bonuseAmount.text)
        })
    })

}
