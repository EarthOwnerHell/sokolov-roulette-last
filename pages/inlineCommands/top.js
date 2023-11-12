const { getGlobal } = require("../../database/managers/global");
const { getUser, getAllTopers } = require("../../database/managers/user");
const { formClick, numberWithSpace, allTopsCoefficent } = require("../../settings/tools");

module.exports = getTops = async (msg, payload) => {
    const { id } = await getUser(msg.senderId)

    const { dayTopBudget, weekTopBudget } = await getGlobal()

    if (!dayTopBudget || !weekTopBudget) return msg.send("🏆 Топ пока пустой...")

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
            9: '&#128287;',
        }

        const res = await getAllTopers('winPerDay')

        let placeInTop = ''

        let statText = `🏆 Топ дня на ${numberWithSpace(dayTopBudget.toFixed(0))} 🎲:\n\n\n`;

        res.forEach(async ({ id, name, winPerDay }, index) => {
            if(index <= 9){ 
                const awardForTop = (dayTopBudget * allTopsCoefficent[index]).toFixed(0)
                statText += `${icons[index] ? icons[index] : index + 1} ${formClick(id, name)} → ${numberWithSpace(winPerDay)} 🎲 \n(награда: ${numberWithSpace(awardForTop)} 🎲)\n`
                if (id == userId) placeInTop += `\n\n👤 Вы в топе на ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(index) ? `${index + 1}` + ' 🔥' : index} месте!\n\n🕕 Призы за топ дня выдаются ежедневно в 00:00, после чего топ обнуляется.`
            } else ''
        });

        return msg.send(statText + placeInTop)
        
    }

    if (payload === 'weekTop') {
        return msg.send("🏆 Топ недели пока что отключен, однако топ дня работает 24/7, заходи в беседы и попадай в него!")
        /*const icons = {
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

        const res = await getAllTopers('winPerWeek')
        let placeInTop = ''
        let statText = `🏆🏆 Топ недели на ${numberWithSpace(weekTopBudget.toFixed(0))} 🎲:\n\n\n`;

        res.forEach(async ({ id, name, winPerWeek }, index) => {
            if(index <= 9){ 
                const awardForTop = (weekTopBudget * allTopsCoefficent[index]).toFixed(0)
                statText += `${icons[index] ? icons[index] : index + 1} ${formClick(id, name)} → ${numberWithSpace(winPerWeek)} 🎲 \n(награда: ${numberWithSpace(awardForTop)} 🎲)\n`
                if (id == userId) placeInTop += `\n\n👤 Вы в топе на ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(index) ? `${index + 1}` + ' 🔥' : index} месте!\n\n🕕❕ Призы за топ недели выдаются каждый понедельник в 00:00, после чего топ обнуляется.`
            } else ''
        });

        return msg.send(statText + placeInTop)
    }*/

}
