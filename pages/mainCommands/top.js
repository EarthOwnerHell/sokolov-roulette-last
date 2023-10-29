const { getTop } = require("../../database/manager/user");
const { formClick, numberWithSpace } = require("../../settings/tools");




module.exports = getTops = async (msg, payload) => {
    const { id, name, winCubes, ref: {value}} = msg.user

    if (payload === 'winCubes') {

        let res;
        let statText;

        const icons = {
            0: '🥇',
            1: '🥈',
            2: '🥉',
            3: '4⃣',
            4: '5⃣',
            5: '6⃣',
            6: '7⃣',
            7: '8⃣',
            8: '9⃣',
            9: '🔟',
        }

        res = await getTop(payload)
        statText = '💸 Топ выигрышей за всё время:\n\n\n';

        res.forEach(async ({ id, name, winCubes, forTopSymbol }, index) => {
            statText += `${icons[index] ? icons[index] : index + 1} ${formClick(id, name)} выиграл ${numberWithSpace(winCubes)} 🎲\n`
        });

        return msg.send(statText)

    }

    if (payload === 'ref.value') {
        let res;
        let statText;

        const icons = {
            0: '🥇',
            1: '🥈',
            2: '🥉',
            3: '4⃣',
            4: '5⃣',
            5: '6⃣',
            6: '7⃣',
            7: '8⃣',
            8: '9⃣',
            9: '🔟',
        }

        res = await getTop(payload)
        statText = '🔗 Топ рефералов: \n\n\n';

        res.forEach(async ({ id, name, ref: { value }, forTopSymbol }, index) => {
            statText += `${icons[index] ? icons[index] : index + 1} ${formClick(id, name)} привёл ${numberWithSpace(value)} рефералов\n`
        });

        return msg.send(statText)
    }

}