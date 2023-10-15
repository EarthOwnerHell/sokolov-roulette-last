const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

const { dbUserStat } = require('./database/managers/user')
const dbGlobal = require('./database/managers/global')
const { vkHelp } = require('./settings/vk');
const buyPrivilege = require('./pages/goods/buyPrivilege');

const { numberWithSpace } = require('./tools.js')

const app = express();

app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const getHashArray = (params, indx = '') => {
    let arr = [];

    if (indx) {
        indx += '/';
    }

    for (let key in params) {
        let val = params[key];

        if (typeof val === 'object' && !Array.isArray(val) && val !== null) {
            arr = {
                ...getHashArray(val, indx + key),
                ...arr,
            }
        } else {
            arr[indx + key] = val;
        }
    }

    return arr;
}

const checkHashKeksik = (data) => {
    let hash = data.hash;
    delete data.hash;

    let obj = getHashArray(data);
    let arr = [];
    let str = '';

    for (let key in obj) {
        arr.push([key, obj[key]]);
    }

    arr.sort();

    for (let item of arr) {
        str += (typeof item[1] === 'boolean' ? (item[1] ? '1' : '') : item[1]) + ',';
    }


    let result = crypto
        .createHash('sha256')
        .update(str + process.env.SECRET_KEY_KEKSIK)
        .digest('hex');


    return result === hash;
}

app.use(bodyParser.json());

app.post('/keksik', async (res, req) => {

    if (res.body.type == 'confirmation') {
        req.send(JSON.stringify({ status: 'ok', code: 'c1d9b3' }));
    } else {
        req.send(JSON.stringify({ status: 'ok' }));

        if (res.body.type == 'new_donate') {
//             const hash = checkHashKeksik(res.body)
//             console.log(hash)
//             if (!hash) return;

            let { user, amount } = res.body.donate;

            const { depCourse } = await dbGlobal.get()

            if (amount >= 499) {
                amount = Number(amount) + Number(amount) * 0.05
            }

            dbUserStat.plus(user, amount * depCourse, 'balancesInfo.main')
            dbUserStat.plus(user, amount, 'balancesInfo.depped');
            
            vkHelp.msg({
                peer_id: user,
                message: `✅ ${await vkHelp.getName(user)}, ты успешно пополнил\nсвой баланс на ${numberWithSpace(amount * depCourse)}$ !!!\n\n🤑 А за пополнение от 499₽\nодним платежом, ты получишь\nбонус +5% к пополнению!`,
                attachment: 'https://vk.com/photo-210860036_457239032'
            })
            
            console.log(`[ 🧁 ] Новый донат на keksik на сумму ${amount} рублей`)
        }
    }

});

app.post('/qiwi', (req, res) => {

    res.status(200).send('OK')

    const { bill: { status, comment, amount } } = req.body

    const [ typePayment, userId ] = comment.split('_')

    if (!typePayment || !userId || status.value !== 'PAID') return;

    buyPrivilege(typePayment, userId, amount.value)
    
    console.log(`[ 🥝 ] Новый донат на QIWI на сумму ${amount.value}`)
})

module.exports = () => app.listen(80, () => console.log(`[ 🔔 ] Сервер включен, порт 80`))
