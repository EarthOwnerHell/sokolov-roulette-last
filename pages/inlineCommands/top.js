const { getGlobal } = require("../../database/managers/global");
const { getUser, getAllTopers } = require("../../database/managers/user");
const { formClick, numberWithSpace, dayTopCoefficent } = require("../../settings/tools");

module.exports = getTops = async (msg, payload) => {
    const { id } = await getUser(msg.senderId)

    const { dayTopBudget } = await getGlobal()

    const userId = id

    if (payload === 'dayTop') {

        const icons = {
            0: '🥇',
            1: '🥈',
            2: '🥉',
            3: '4&#8419;',
            4: '5&#8419;',
            5: '6&#8419;',
            6: '7&#8419;',
            7: '8&#8419;',
            8: '9&#8419;',
            9: '10&#8419;',
        }

        const res = await getAllTopers('winPerDay')

        let placeInTop = ''

        let statText = `🏆 Топ дня на ${numberWithSpace(dayTopBudget.toFixed(0))} 🎲:\n\n\n`;

        res.forEach(async ({ id, name, winPerDay }, index) => {
            if(index <= 10){ 
                const awardForTop = (dayTopBudget * dayTopCoefficent[index]).toFixed(0)
                statText += `${icons[index] ? icons[index] : index + 1} ${formClick(id, name)} → ${numberWithSpace(winPerDay)} 🎲 \n(награда: ${numberWithSpace(awardForTop)} 🎲)\n`
                if (id == userId) placeInTop += `\n\n👤 Вы в топе на ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(index) ? `${index + 1}` + ' 🔥' : index} месте!\n\n🕕 Призы за топ дня выдаются ежедневно в 00:00, после чего он обнуляется.`
            } else ''
        });

        return msg.send(statText + placeInTop)
        
    }

    if (payload === 'weekTop') {

        const icons = {
            0: '🥇',
            1: '🥈',
            2: '🥉',
            3: '4&#8419;',
            4: '5&#8419;',
            5: '6&#8419;',
            6: '7&#8419;',
            7: '8&#8419;',
            8: '9&#8419;',
            9: '10&#8419;',
        }

        const res = await getAllTopers('winPerDay')
        let placeInTop = ''
        let statText = '🏆 Топ дня на число 🎲:\n\n\n';

        res.forEach(async ({ id, name, winPerDay }, index) => {
            if(index <= 10){
                statText += `${icons[index] ? icons[index] : index + 1} ${formClick(id, name)} выиграл ${numberWithSpace(winPerDay)} 🎲\n`
            }
            if (id == userId) placeInTop += `\n\n👤 Вы в топе на ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(index) ? `${index + 1}` + ' 🔥' : index} месте!\n\n🕕 Призы за топ дня выдаются ежедневно в 00:00, после чего он обнуляется.`
        });

        return msg.send(statText + placeInTop)
    }

}