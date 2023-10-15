const Numbers = require('number-to-emoji');
const dbGlobal = require('./database/managers/global');
const lakingMoneyMenu = require('./keyboards/inline/lakingMoneyMenu');
const axios = require('axios')
const md5 = require('md5')
const crypto = require("crypto");

const { vkHelp } = require("./settings/vk");

const formClick = (id, text, group = false) => {
    const finishedText = `@${!group ? 'id' : 'public'}${id} (${text})`

    return finishedText
}

const createSecretWord = (textForHashing, password) => {
    const algorithm = 'aes-192-cbc'

    const key = crypto.scryptSync(password, 'salt', 24)
    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(algorithm, key, iv)

    const encryptedText = cipher.update(textForHashing, 'utf8', 'hex') + cipher.final('hex');

    return `${textForHashing}|${encryptedText}`
}

const createHash = (secretWord) => md5(secretWord)

const numbersToEmoji = (number) => Numbers.toEmoji(number)

const numberWithSpace = (value) => new Intl.NumberFormat('ru-RU').format(value);

const getColorStorage = (accumulated, privilegeLvL) => {
    const lvlOfAccumulateds = {
        first: privilegeLvL !== 3 ? 250_000 : 500_000,
        second: privilegeLvL !== 3 ? 500_000 : 1_000_000,
        third: privilegeLvL !== 3 ? 750_000 : 1_500_000,
    }

    return accumulated < lvlOfAccumulateds.first ? '🟢' : accumulated < lvlOfAccumulateds.second ? '🟡' : accumulated < lvlOfAccumulateds.third ? '🟠' : '🔴'
}

const getEarnedMoney = (lastGetEarn, invested, privilegeLvL) => {
    const timePassed = Date.now() - lastGetEarn;

    let earned = Math.floor(timePassed * invested) / 86_400_000;

    const storage = privilegeLvL === 3 ? 2_000_000 : 1_000_000

    if (privilegeLvL === 1) earned = earned + (earned * 0.01)

    if (privilegeLvL === 2) earned = earned + (earned * 0.05)

    if (privilegeLvL === 3) earned = earned + (earned * 0.1)

    if (earned > storage) earned = storage

    return earned;
}

const getEarnedRubs = (lastGetEarn, invested, privilegeLvL, hackProcent, depCourse) => {
    const timePassed = Date.now() - lastGetEarn;

    let earned = Math.floor(timePassed * invested) / 86_400_000;

    const storage = privilegeLvL === 3 ? 2_000_000 : 1_000_000

    if (earned > storage) earned = storage

    earned = earned / (depCourse + earned * (hackProcent / 100))

    if (privilegeLvL === 1) earned = earned + (earned * 0.025)

    if (privilegeLvL === 2) earned = earned + (earned * 0.05)

    if (privilegeLvL === 3) earned = earned + (earned * 0.5)

    return earned;
}

const getProcentForUserFromRef = (countRefs) => {

    const countRefsForLVL = [15, 30, 45, 60, 75, 90];

    const userLvL = countRefsForLVL.findIndex(x => x > countRefs) >= 0 ? countRefsForLVL.findIndex(x => x > countRefs) : countRefs < 15 ? 0 : 6
    
    const needUpgrade = countRefs % 15 === 0 && countRefs !== 0 ? true : false 

    return {
        text: `${userLvL} уровень`,
        needUpgrade: needUpgrade
    }
}

const getDeclining = (number, words) => {
    number = Math.ceil(number)
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}

const giveBonuseForNewLvl = async (userId, countRefs) => {
    const { dbUserStat } = require('./database/managers/user.js')

    const bonuses = {
        15: () => [vkHelp.msg({ peer_id: userId, message: '🎁 Вы получили 1 уровень реф. системы. За это мы дарим вам "🌭 Магазин Хот-догов"'}), dbUserStat.plus(userId, 1_200, 'balancesInfo.invest')],
        30: () => [vkHelp.msg({ peer_id: userId, message: '🎁 Вы получили 2 уровень реф. системы. За это мы дарим вам "☕ Магазин Кофе с собой"'}), dbUserStat.plus(userId, 2_800, 'balancesInfo.invest')],
        45: () => [vkHelp.msg({ peer_id: userId, message: '🎁 Вы получили 3 уровень реф. системы. За это мы дарим вам "📒 Магазин Комиксов"'}), dbUserStat.plus(userId, 6_700, 'balancesInfo.invest')],
        60: () => [vkHelp.msg({ peer_id: userId, message: '🎁 Вы получили 4 уровень реф. системы. За это мы дарим вам "🍟 Доставка еды"'}), dbUserStat.plus(userId, 13_500, 'balancesInfo.invest')],
        75: () => [vkHelp.msg({ peer_id: userId, message: '🎁 Вы получили 5 уровень реф. системы. За это мы дарим вам "📦 Служба доставки"'}), dbUserStat.plus(userId, 26_500, 'balancesInfo.invest')],
        90: () => [vkHelp.msg({ peer_id: userId, message: '🎁 Вы получили 6 уровень реф. системы. За это мы дарим вам "🖥 Разработка VR-игр"'}), dbUserStat.plus(userId, 41_000, 'balancesInfo.invest')],
    }

    try {
        await Promise.all(bonuses[countRefs]())
    } catch {}
}

const createTopOfInvestors = async (userId) => {
    const { dbUser, getTopByOption } = require('./database/managers/user.js')

    const privilegeLvLEmojies = {
        0: '',
        1: '',
        2: '⚡',
        3: '🔥',
    }

    const [top, userInfo] = await Promise.all([getTopByOption('balancesInfo.allInvested'), dbUser.get(userId, { id: 1, 'balancesInfo.allInvested': 1 })])

    const userPosition = await dbUser.getTopUserPosition(userId, userInfo.balancesInfo.allInvested, 'balancesInfo.allInvested')

    let topText = `💰 Топ вложений:\n\n`

    if (!top.length) return '❗ Для топа слишком мало статистики, попробуйте позже'

    const textForTop = await Promise.all(top.map(async ({ id, balancesInfo: { allInvested }, privilegeLvL, nickname }, index) => {
        topText += `${Numbers.toEmoji(index + 1)} | ${privilegeLvLEmojies[privilegeLvL]} ${formClick(id, nickname)} ➔ ${numberWithSpace(allInvested)} $\n`
    }))

    topText += `\n💬 ${formClick(userId,'Ваше')} место в топе:\n⏩${Numbers.toEmoji(userPosition)} | ${numberWithSpace(userInfo.balancesInfo.allInvested)} $`

    return topText

}

const createTopOfRefs = async (userId) => {
    const { dbUser, getTopByOption } = require('./database/managers/user.js')

    const privilegeLvLEmojies = {
        0: '',
        1: '',
        2: '⚡',
        3: '🔥',
    }

    const [userPosition, top, userInfo] = await Promise.all([dbUser.getTopUserPosition(userId, 0, 'refs.count'), getTopByOption('refs.count'), dbUser.get(userId, { id: 1, 'refs.count': 1 })])

    let topText = `💰 Топ рефералов:\n\n`

    if (!top.length) return '❗ Для топа слишком мало статистики, попробуйте позже'

    const textForTop = await Promise.all(top.map(async ({ id, refs: { count }, privilegeLvL, nickname }, index) => {

        topText += `${Numbers.toEmoji(index + 1)} | ${privilegeLvLEmojies[privilegeLvL]} ${formClick(id, nickname)} ➔ ${numberWithSpace(count)}\n`
    }))
    
    topText += `\n💬 ${formClick(userId,'Ваше')} место в топе:\n⏩${Numbers.toEmoji(userPosition)} | ${numberWithSpace(userInfo.refs.count)} ${getDeclining(userInfo.refs.count, ['реферал', 'реферала', 'рефералов'])}`

    return topText

}

const getConvertedArray = (array, splitBy = 99, buttonsArray = false) => {
    let arrayCopy = [...array];
    let mainChunc = [];
    let childChunc = [];

    arrayCopy.forEach((elem, ind) => {
        childChunc.push(elem);
        if (childChunc.length >= splitBy) {
            mainChunc.push(childChunc);
            childChunc = [];
        }

        if (arrayCopy.length - ind <= 1) {
            mainChunc.push(childChunc);
        }
    });

    if (buttonsArray && mainChunc.length >= 7) {
        mainChunc.length = 7
    }

    return !buttonsArray ? mainChunc.map((childArr) => childArr.join(',')) : mainChunc
}

const convertMsToSec = (miliseconds) => {
    const total_seconds = parseInt(Math.floor(miliseconds / 1000));

    return parseInt(total_seconds % 60);
}

const processArray = async ({ items, process, delay = 25, adminsId, countUsers }) => {
    let startTime = Date.now();

    var todo = items.concat();

    setTimeout(async function () {
        process(todo.shift());
        if (todo.length > 0) {
            setTimeout(arguments.callee, delay);
        } else {
            vkHelp.msg({
                peer_id: adminsId.join(','),
                message: `🤖 Рассылка окончена.\n\n⏱ Разослали за: ${numberWithSpace(convertMsToSec(Date.now() - startTime))} ${getDeclining(Math.floor(Date.now() - startTime), ['секунду', 'секунды', 'секунд'])}\n\n📊 Разослано сообщений: ${countUsers}`
            })
        }
    }, delay);
}

const getRandomNumber = (winNumbersArray) => {
    let sum = 0;
    for (let i = 0; i < winNumbersArray.length; i++) {
        sum += winNumbersArray[i].winPercent;
    }

    let rand = Math.floor(Math.random() * sum);

    let i = 0;

    for (let s = winNumbersArray[0].winPercent; s <= rand; s += winNumbersArray[i].winPercent) {
        i++;
    }

    return winNumbersArray[i].number
}

const lakingMoney = async (userId, amount) => {
    const { depCourse } = await dbGlobal.get()
    const amountDep = amount / depCourse > 1 ? amount / depCourse : 1
    
    return {
        peer_id: userId,
        message: `⚠ ${await vkHelp.getName(userId)}, вам не хватает ${numberWithSpace(amount)} $\n🔥 Пополните на ${numberWithSpace(amountDep)} ${getDeclining(amountDep, ['рубль', 'рубля', 'рублей'])}\n\n🤑 А за пополнение от 499₽\nсразу, ты получишь бонус 5% к своему пополнению`,
        keyboard: lakingMoneyMenu(amountDep)
    }
}

const getRandomInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

const getMinimumBeEarned = (allInvested, earnedCoins, maxBeEarnedCoins) => {
    console.log(earnedCoins, maxBeEarnedCoins)
    if (earnedCoins >= maxBeEarnedCoins) {
        return 10;
    }

    if (allInvested <= 100) {
        return 10
    } 
    if (allInvested >= 101 && allInvested <= 250) {
        return 11
    }
    if (allInvested >= 251 && allInvested <= 400) {
        return 11
    }
    if (allInvested >= 401 && allInvested <= 1_000) {
        return 13
    }
    if (allInvested >= 1_001 && allInvested <= 2_000) {
        return 14
    }
    if (allInvested >= 2_001 && allInvested <= 3_000) {
        return 14
    }
    if (allInvested >= 3_001) {
        return 15
    }
}

const getUserTimeReg = async (id) => {
    let now;
    
    let year = 0;
    let month = 0;
    let day = 0;
    
    const response = await axios.get(`https://vk.com/foaf.php?id=${id}`)
    
    const text = response.data;
    
    try {
         let [y, m, d] = text.split(':created dc:date="')[1].split('T')[0].split('-');
        
         year = y
         month = m
         day = d
        
    } catch {}

    now = new Date(year, month - 1, day);

    const time = now.getTime();

    return Date.now() - time >= 86_400_000 * 14 && Date.now() - time > 0 ? 1 : 0
}

module.exports = {
    formClick,
    numberWithSpace,
    getColorStorage,
    getEarnedMoney,
    getProcentForUserFromRef,
    getDeclining,
    createTopOfInvestors,
    createTopOfRefs,
    getConvertedArray,
    processArray,
    getRandomNumber,
    lakingMoney,
    getRandomInRange,
    giveBonuseForNewLvl,
    getEarnedRubs,
    getUserTimeReg,
    numbersToEmoji,
    createSecretWord,
    createHash,
    convertMsToSec,
    getMinimumBeEarned,
}
