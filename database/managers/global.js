const Global = require("../models/global")

const getGlobal = (name = 'Global') => Global.findOne({ name })


const autoCreateGlobal = async () => {

    const global = await getGlobal()

    if (global) return
    
    const newGlobal = new Global({ })

    newGlobal.save().then(console.log)

}

const editWinToday = (sum) => (
    Global.findOneAndUpdate({
        name: 'Global'
    }, {
        $inc: {
            'winToday': sum
        }
    }).then()
)

const editLossToday = (sum) => (
    Global.findOneAndUpdate({
        name: 'Global',
    }, {
        $inc: {
            'lossToday': sum
        }
    }).then()
)

const setForRef = (sum) => (
    Global.findOneAndUpdate({
        name: 'Global'
    }, {
        $set: {
            'forRef': sum
        }
    }).then(console.log(`--> Сменили сумму за рефа на ${sum}`))
)

module.exports = {
    getGlobal,
    autoCreateGlobal,
    setForRef,
    editWinToday,
    editLossToday
};
