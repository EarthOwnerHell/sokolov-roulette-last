const { model, Schema } = require('mongoose')

const defaultValue = (type, value, index = false) => ({ type, default: value, index });

const Global = model(
    'Global',
    new Schema({
        name: defaultValue(String, 'Global'),
        forRef: defaultValue(Number, 33000),
        lossToday: defaultValue(Number, 0),
        winToday: defaultValue(Number, 0),
        dayTopBudget: defaultValue(Number, 0),
        weekTopBudget: defaultValue(Number, 0)
    })
);

module.exports = Global; 
