const { formClick, numberWithSpace } = require('../../settings/tools')
const { Users } = require('../models/user')
const { getGlobal } = require('./global')

const getUser = async(id) => {
    const user = await Users.findOne({ id })
    return user
}
const getUserByNumber = (phone) => Users.findOne({ phone })

const plusBalanceUser = (id, sum) => (
    Users.findOneAndUpdate({
        id
    }, {
        $inc: {
            'balance': sum
        }
    }).then()
)

const plusWinCubes = (id, sum) => (
    Users.findOneAndUpdate({
        id
    }, {
        $inc: {
            'winCubes': sum
        }
    }).then()
)

const plusWithdrawnCubes = (id, sum) => (
    Users.findOneAndUpdate({
        id
    }, {
        $inc: {
            'withdrawnCubes': sum
        }
    }).then()
)

const setBan = (id) => (
    Users.findOneAndUpdate({
        id
    }, {
        $set: {
            'ban': true
        }
    }).then(console.log(`--> Забанили пользователя https://vk.com/id${id}`))
)

/*const editPrivilege = (id, privilege) => (
    Users.findOneAndUpdate({
       id,
   }, { 
       $set: {
            "privilege": privilege
      }
  }).then(console.log("Сменили привилегию"))
)*/

const editSymbol = (id, symbol) => (
    Users.findOneAndUpdate({
       id,
   }, { 
       $set: {
            "forTopSymbol": symbol
      }
  })
)

const minusBalanceUser = (id, sum) => (

    Users.findOneAndUpdate({
        id
    }, {
        $inc: {
            'balance': -sum
        }
    }).then(console.log(sum))

)

const setQiwiPhone = (id, phone) => (
    Users.findOneAndUpdate({
        id
    }, {
        $set: {
            phone: phone
        }
    }).then()
)

/*const setNewLastEarn = (id) => {
    Users.findOneAndUpdate({
        id
    }, {
        $set: {
            'lastEarn': Date.now()
        }
    }).then()
}*/

const getTop = async (name) => Users.find({ admin: false }).sort({ [`${name}`]: -1 }).limit(10)

const createUser = async (props) => {

    const { id, name, refferer } = props

    const user = new Users({
        id,
        name,
        ['ref.refferer']: refferer ? Number(refferer) : 297789589,
        admin: [297789589, 262489448].includes(id) ? true : false,
    })

    user.save().then(console.log(`--> Новый пользователь: https://vk.com/id${id}`))

    if (refferer) {
        const { forRef } = await getGlobal()
        const forRefferer = await getUser(refferer)

        console.log(await plusBalanceUser(id, 250000))

        Users.findOneAndUpdate({
            id: [forRefferer.id]
        }, {
            $inc: {
                ['ref.value']: 1,
                'balance': forRef
            }
        }).then(console.log)

        msg.send(id, `💸 Вы получили 250 000 🎲 за переход по реф.ссылке!`)
        msg.send(forRefferer.id, `🚀 ${formClick(id, 'Пользователь')} перешёл по вашей ссылке!\n🎁 На баланс начислено ${forRef} 🎲\n\n🍀Удачной игры!`)

    }

}

/*function setLastGetBonuses(id){
    Users.findOneAndUpdate(
        {
            id,
        },
        {
            $set: {
                lastGet: Date.now(),
            },
        }
    ).then();
}*/

const setUnban = (id) => (
    Users.findOneAndUpdate({
        id
    }, {
        $set: {
            'ban': false
        }
    }).then(console.log(`--> Разбанили пользователя https://vk.com/id${id}`))
)

module.exports = {
    createUser,
    getUser,
    plusBalanceUser,
    minusBalanceUser,
    setQiwiPhone,
    getTop,
    setBan,
    editSymbol,
    getUserByNumber, 
    setUnban,
    plusWinCubes,
    plusWithdrawnCubes
}
