const { model, Schema } = require('mongoose');

const defaultValue = (type, value, index = false) => ({ type, default: value, index });

const Users = model(
    'Users',
    new Schema({
        id: {
            type: Number,
            index: true
        },
        name: String,
        balance: defaultValue(Number, 0),
        phone: defaultValue(String, ''),
        deppedCubes: defaultValue(Number, 0),
        withdrawnCubes: defaultValue(Number, 0),
        winCubes: defaultValue(Number, 0),
        winPerDay: defaultValue(Number, 0),
        winPerWeek: defaultValue(Number, 0),
        bonuseBalance: defaultValue(Number, 0),
        //lastGet: defaultValue(Number, Date.now() - 86500000),
        ban: defaultValue(Boolean, false),
        admin: Boolean,
        ref: {
            type: Object,
            default: {
                refferer: Number,
                value: 0,
            },
        },
    })
);

module.exports = {
    Users
};
