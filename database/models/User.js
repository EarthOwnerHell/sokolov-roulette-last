const { model, Schema } = require('mongoose')

const defaultValue = (type, value, index = false) => ({ type, default: value, index });

const UserSchema = new Schema({
    id: {
        type: Number,
        index: true
    },
    admin: {
        type: Number,
        index: true
    },
    privilegeLvL: defaultValue(Number, 0, true),
    balancesInfo: {
        main: defaultValue(Number, 0),
        invest: defaultValue(Number, 0, true),
        allInvested: defaultValue(Number, 0, true),
        withdrawned: defaultValue(Number, 0, true),
        rub: defaultValue(Number, 0),
        depped: defaultValue(Number, 0, true),
    },
    refs: {
        count: defaultValue(Number, 0, true),
        referrer: defaultValue(Number, 0, true)
    },
    qiwi: defaultValue(String, '', true),
    lastGetEarn: defaultValue(Number, Date.now()),
    lastEarnBonusePrivilege: defaultValue(Number, Date.now()),
    ban: defaultValue(Number, 0),
    nickname: { type: String, index: true },
    avatar: defaultValue(Number, 0),
    sub: defaultValue(Number, 0)
})

const User = new model('Users', UserSchema)

module.exports = User;
