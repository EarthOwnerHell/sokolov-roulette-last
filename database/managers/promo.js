const Promo = require("../models/Promo");

const promo = {
    get: (promoName) => Promo.findOne({ promoName }).lean(),
    create: (promoName, amountUsing, amountForPromo) => {
        return Promo.create({ promoName, amountUsing, amountForPromo })
    },
    addUsing: (promoName, userId) => {
        Promo.updateOne({
            promoName
        }, {
            $push: {
                usedBy: userId
            }
        }).then()
    },
    minusUsing: (promoName) => {
        Promo.updateOne({
            promoName
        }, {
            $inc: {
                amountUsing: -1
            }
        }).then()
    },
}

module.exports = promo