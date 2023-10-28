const { vk, api, vkMsg} = require('./vk');
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
    vkMsg(297789589, `ℹ🧑‍💻Итоги сегодняшнего дня:\n\n🟥 Выиграно: ${numberWithSpace(winToday)}\n🟩 Проиграно: ${numberWithSpace(lossToday)}\n\n💸 Прибыль: ${numberWithSpace(lossToday - winToday)}`)
    editWinToday(-winToday)
    editLossToday(-lossToday)
    return
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

const convertMsToSec = (miliseconds) => {
    const total_seconds = parseInt(Math.floor(miliseconds / 1000));

    return parseInt(total_seconds % 60);
}

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
    convertMsToSec
};
