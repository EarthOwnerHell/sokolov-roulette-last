const { vk, api, vkHelp } = require('./vk');
const schedule = require('node-schedule');
const { getRandomId } = require('vk-io')
const axios = require('axios')
const { plusBalanceUser } = require('../database/managers/user')
const { getGlobal, editWinToday, editLossToday } = require('../database/managers/global')
const crypto = require('crypto')

const deckOfNum = (number, words) =>
    words[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
    ];

const numberWithSpace = (value) => new Intl.NumberFormat('ru-RU').format(value);

const formClick = (id, text = id) => `@id${id}(${text})`;

function getLength(number){
    return number.toString().length
}

const commandArgs = (msg) => {
    const payload = msg?.messagePayload?.command !== undefined ? msg.messagePayload.command : msg.eventPayload 
    return payload.split(":").slice(1)
    }

const resetLossWin = async() => {
    const { winToday, lossToday } = await getGlobal()
    vkHelp({peer_id: 297789589, message: `ℹ🧑‍💻Итоги сегодняшнего дня:\n\n🟥 Выиграно: ${numberWithSpace(winToday)}\n🟩 Проиграно: ${numberWithSpace(lossToday)}\n\n💸 Прибыль: ${numberWithSpace(lossToday - winToday)}`})
    await editWinToday(-winToday)
    await editLossToday(-lossToday)
    return
    }

    const allTopsCoefficent = {
        0: 0.35,
        1: 0.18,
        2: 0.12,
        3: 0.09,
        4: 0.07,
        5: 0.06,
        6: 0.05,
        7: 0.04,
        8: 0.035,
        9: 0.015,
    }

function getSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function processArray(items, process, delay = 25) {
    let startTime = Date.now();

    var todo = items.concat();
    
    let count = 0;

    setTimeout(function () {
        process(todo.shift());
        if (todo.length > 0) {
            count = count + 100
            setTimeout(arguments.callee, delay);
        } else {
            vk.api.messages
                .send({
                    peer_ids: [297789589],
                    message: `🎊 Рассылка закончена.\n\n=================\n\n⏲ Разослали за: ${getSeconds(Date.now() - startTime)} минут\n\n==============\n\n✉ Сообщений разослали: ${numberWithSpace(count)}`,
                    random_id: getRandomId(),
                })
                .then((res) => {})
                .catch((e) => {
                    console.log(e);
                });
        }
    }, delay);
}

function getConvertedArray(array, splitBy = 99) {
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

    return mainChunc.map((childArr) => childArr.join(','));
}

const translateGroupTypes = {
    'official' : '@sokolov_roulette(Официальная)',
    'standart' : 'Бесплатная (0%)',
    'comfort' : 'Комфорт (5%)',
    'premium' : 'Премиум (10%)',
    'vip': 'VIP (15%)'
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

const convertSecToBeautySec = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    console.log(remainingSeconds)
  
    const formattedMinutes = String(minutes);
    const formattedSeconds = String(Math.floor(remainingSeconds)).padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}`;
}

function range(start, end) {
    let range = []
    for(let i = start; i <= end; i++){
    range.push(i)
    }
    return range
    }

    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = 1; // 0 - воскресенье, 1 - понедельник, и так далее
    rule.tz = 'Etc/GMT-3'; // Устанавливаем часовой пояс Москвы
    rule.hour = 0;
    rule.minute = 0;    

module.exports = {
    deckOfNum,
    crypto,
    numberWithSpace,
    formClick,
    processArray,
    getConvertedArray,
    getUserTimeReg,
    getLength,
    resetLossWin,
    commandArgs,
    convertSecToBeautySec,
    allTopsCoefficent,
    rule,
    translateGroupTypes,
    range
};
