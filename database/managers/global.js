const Global = require("../models/Global");

const dbGlobal = {
    get: () => Global.findOne({}).lean(),
    add: async () => {

        const global = await dbGlobal.get()

        if (global) return;

        Global.create({});

    },
    setDepCourse: (depCourse) => {
        Global.updateOne({}, {
            $set: {
                'depCourse': depCourse
            }
        }).then()
    },
    setHeckPercent: (value) => {
        Global.updateOne({}, {
            $set: {
                'hackPercent': value
            }
        }).then()
    },
    setRefBonuse: (value) => {
        Global.updateOne({}, {
            $set: {
                'refBonuse': value
            }
        }).then()
    },
}

module.exports = dbGlobal