const { model, Schema } = require('mongoose')

const defaultValue = (type, value, index = false) => ({ type, default: value, index });

const Global = new model('Globals', new Schema({
    depCourse: defaultValue(Number, 16_000),
    hackPercent: defaultValue(Number, 5),
    refBonuse: defaultValue(Number, 40_000),
}))

module.exports = Global; 