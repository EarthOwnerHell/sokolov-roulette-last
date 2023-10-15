const User = require("../models/User");

const global = require("./global.js");

const mainMenu = require("../../keyboards/usual/main");

const { vkHelp } = require("../../settings/vk");
const { numberWithSpace, formClick, getProcentForUserFromRef, giveBonuseForNewLvl } = require("../../tools");

const photosEducation = require('../../settings/photos/education.json');
const education = require("../../keyboards/inline/education");

const dbUserStat = {
    modify: async (id, amount, statName = 'balance') => {
        const check = await User.updateOne({
            id
        }, {
            $inc: {
                [statName]: amount
            }
        }).catch()

        return check
    },
    plus: (id, amount, statName = 'balance') => dbUserStat.modify(id, amount, statName),
    minus: (id, amount, statName = 'balance') => dbUserStat.modify(id, -amount, statName)
}

const getTopByOption = async (option) => { // admin: 0
    const top = await User.find({ admin: 0 }, { id: true, [option]: true, _id: false, privilegeLvL: 1, nickname: 1 }).limit(10).sort({
        [`${option}`]: -1,
    }).lean()

    return top
};

const getCountUsersByOption = (option) => User.find(option).lean().count()

const getAllEarningsInGame = async () => {
    let sum = 0;

    const usersCount = await User.find({ admin: 0 }).count()

    if (!usersCount) return sum

    const [{ items }] = await User.aggregate([
        { $match: { admin: 0 } },
        { $unwind: "$balancesInfo" },
        {
            $group: {
                _id: "$balancesInfo.withdrawned",
                v: { $sum: "$balancesInfo.withdrawned" }
            }
        },
        {
            $group: {
                _id: null,
                items: {
                    $push: {
                        k: "$_id",
                        v: "$v"
                    }
                }
            }
        }
    ])

    items.map(({ v }) => sum += v)

    return sum
}

const getAllInvestInGame = async () => {
    let sum = 0;

    const usersCount = await User.find({ admin: 0 }).count()

    if (!usersCount) return sum

    try {
        const [{ items }] = await User.aggregate([
            { $match: { admin: 0 } },
            { $unwind: "$balancesInfo" },
            {
                $group: {
                    _id: "$balancesInfo.allInvested",
                    v: { $sum: "$balancesInfo.allInvested" }
                }
            },
            {
                $group: {
                    _id: null,
                    items: {
                        $push: {
                            k: "$_id",
                            v: "$v"
                        }
                    }
                }
            }
        ])

        items.map(({ v }) => {
            sum += v
        })
    } catch {
        return sum
    }

    return sum
}

const getAdmins = async () => {

    const admins = await User.find({ admin: 1 }, { id: 1, _id: 0 }).lean()

    const adminsId = admins.map(x => x.id)

    return adminsId

}

const dbUser = {
    get: (id, payload = { id: 1 }) => User.findOne({ id }, payload).lean(),
    add: async ({ id, referrer, name }) => {
        User.create({
            id: id,
            nickname: name,
            'refs.referrer': referrer ? referrer : 0,
            admin: [222856843, 621957101].includes(id)
        })
            .catch((err) => console.error(new Error('[ ❗ ] Не смогли добавить пользователя\n')))
            .then(console.log(`[ 🔔 ] Новый пользователь -> https://vk.com/id${id}\n`))

        if (referrer && referrer !== id) {
            const { depCourse, refBonuse } = await global.get()

            const { refs: { count } } = await dbUser.get(referrer, { refs: 1 })

            const { needUpgrade } = getProcentForUserFromRef(count + 1)

            if (needUpgrade) giveBonuseForNewLvl(referrer, count + 1)

            dbUserStat.plus(referrer, refBonuse, 'balancesInfo.main')
            dbUserStat.plus(referrer, 1, 'refs.count')
            dbUserStat.plus(id, refBonuse, 'balancesInfo.main')

            vkHelp.msg({
                peer_id: referrer,
                message: `👤 У вас новый ${formClick(id, 'реферал')}\n\n🎁 Вы получили ${numberWithSpace(refBonuse / depCourse)} ₽ (${numberWithSpace(refBonuse)} $) за реферала`
            })

            setTimeout(() => vkHelp.msg({
                peer_id: id,
                message: `🎁 Ты стал рефералом\n${formClick(referrer, 'пользователя')} и получил ${numberWithSpace(refBonuse)}$\n(${numberWithSpace(refBonuse / depCourse)}₽) на баланс для покупок`
            }), 500)
        }

        const usersCount = await getCountUsersByOption()

        vkHelp.msg({
            peer_id: id,
            message: `😎 Добро пожаловать\nв игру «CASH BANGER»\n\nСТАНЬ КРУТЫМ БИЗНЕСМЕНОМ\nПокупай Бизнесы и становись богаче! Бизнесы приносят (₽)\n\n🎮 С нами уже ${numberWithSpace(usersCount)} игроков\n💳 Уже инвестировали ${numberWithSpace(await getAllInvestInGame())}$\n\n🍀 Удачного заработка, игрок! `,
            keyboard: mainMenu([222856843, 621957101].includes(id))
        })

        const addCarouselElement = ({ photo_id, buttons }) => ({
            photo_id,
            buttons
        })

        const chooseActionCarousel = JSON.stringify({
            type: 'carousel',
            elements: Object.values(photosEducation).map((item, index) => addCarouselElement({ photo_id: item, buttons: education(index) })),
        });

        setTimeout(() => vkHelp.msg({
            peer_id: id,
            message: "Обучение",
            template: chooseActionCarousel
        }), 1_500)

        return true;
    },
    getTopUserPosition: async (id, optionValue, optionName) => { // admin: 0
        const userPosition = await User.find({
            $gt: {
                [optionName]: optionValue
            }
        }).sort({ [optionName]: -1 }).lean()

        console.log(userPosition.findIndex(x => x.id === id))

        return userPosition.findIndex(x => x.id === id) + 1;
    },
    setLastWithdraw: (id, time = Date.now()) => {
        return User.updateOne({
            id
        }, {
            $set: {
                'lastGetEarn': time
            }
        }).then()
    },
    setAvatar: (id, number) => {
        User.updateOne({
            id: id
        }, {
            $set: {
                'avatar': number
            }
        }).then()
    },
    setPrivilege: (id, lvl) => {
        User.updateOne({
            id
        }, {
            $set: {
                'privilegeLvL': lvl
            }
        }).then()
    },
    setQiwiPhone: (id, phone) => {
        User.updateOne({
            id
        }, {
            $set: {
                'qiwi': phone
            }
        }).then()
    },
    setLastEarnPrivilegeBonuse: (id) => {
        User.updateOne({
            id
        }, {
            $set: {
                'lastEarnBonusePrivilege': Date.now()
            }
        }).then()
    },
    setBan: (userId, value) => {
        User.updateOne({ id: userId }, {
            $set: {
                ban: value
            }
        }).then()
    },
    setNickname: (userId, nick) => {
        User.updateOne({ id: userId }, {
            $set: {
                nickname: nick
            }
        }).then()
    },
    setSub: (userId, value = 1) => {
        User.updateOne({ id: userId }, {
            $set: {
                sub: value
            }
        }).then()
    }
}

const getUsersWithSamePhone = async (phone) => {
    const phones = await User.find({ qiwi: phone }, { id: 1 })

    let result = []

    if (phones.length > 1) {
        phones.map(({ id }) => {

            dbUser.setBan(id, 1)

            result.push(`https://vk.com/id${id}\n`)

        })
    }

    return result
}

module.exports = {
    dbUser,
    dbUserStat,
    getCountUsersByOption,
    getAllEarningsInGame,
    getAllInvestInGame,
    getTopByOption,
    getAdmins,
    getUsersWithSamePhone,
}
