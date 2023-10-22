const { getGlobal } = require('../../database/managers/global');
const { Users } = require('../../database/models/user');
const { topBoard } = require('../../keyboards/inline');
const { numberWithSpace } = require('../../settings/tools');
const { vk } = require('../../settings/vk')

module.exports = stats = async (msg) => {
    const users = await Users.find({});
    const { winToday, lossToday } = await getGlobal()
    const { count } = await vk.api.messages.getDialogs({ count: 1 });

    let allWithdraw = 0; 
    let allWin = 0;

    users.forEach(({ withdrawnCubes, winCubes }) => {
        allWithdraw += withdrawnCubes
        allWin += winCubes

    });

    users.forEach(({ withdrawnCubes, winCubes }) => {
        allWithdraw += withdrawnCubes
        allWin += winCubes

    });

    console.log(winToday, lossToday)

    if (msg.id == 297789589) return msg.send(`ℹ🧑‍💻Информация о сегодняшнем дне:\n\n🟥 Выиграно: ${numberWithSpace(winToday)}\n🟩 Проиграно: ${numberWithSpace(lossToday)}\n\n💸 Прибыль: ${numberWithSpace(lossToday - winToday)}`)

    msg.send(
        `ℹ Общая статистика бота:\n\n👥 Пользователей: ${numberWithSpace(
            count
        )}\n---
        \n🍀 Выиграно за всё время: ${numberWithSpace(allWin)} 🎲\n---
        \n💸 Всего выведено: ${numberWithSpace(allWithdraw)} 🎲`
    );
};
