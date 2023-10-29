const { getUser } = require('../../database/managers/user')
const { numberWithSpace } = require('../../settings/tools')

module.exports = ref = async (msg) =>  {
    const { winCubes, withdrawnCubes, deppedCubes } = await getUser(msg.senderId)
    return msg.send(
`
🍀 Вы выиграли за всё время: ${numberWithSpace(winCubes.toFixed(0))}
———
💰 Вы пополнили: ${numberWithSpace(deppedCubes.toFixed(0))}
———
🎲 Вы вывели: ${numberWithSpace(withdrawnCubes.toFixed(0))}
`
    )
}
