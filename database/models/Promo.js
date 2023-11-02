const { model, Schema } = require('mongoose')

const defaultValue = (type, value, index = false) => ({ type, default: value, index });

const Promo = model('Promo', new Schema({
    promoName: defaultValue(String, ''),
    amountForPromo: defaultValue(Number, 0),
    amountUsing: defaultValue(Number, 0),
    usedBy: defaultValue(Array, []),
}))

module.exports = Promo