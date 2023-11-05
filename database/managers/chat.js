const Chat = require("../models/Chat")

const chat = {
    getChat: (peerId) => Chat.findOne({ peerId }).lean(),
    createChat: (props) => {
        const { peerId, botAdmin, groupType } = props
        const chat = new Chat({
            peerId,
            botAdmin,
            groupType
        })
    
        chat.save().then(console.log(`--> Новая беседа!`))
    },
    setGame: (peerId, game) => Chat.updateOne({
        peerId: peerId
    }, {
        $set: {
            game: game
        }
    }),
    setEndTime: (peerId, endTime) => Chat.updateOne({
        peerId: peerId
    }, {
        $set: {
            endTime: endTime
        }
    }),
    setGroupType: (peerId, type) => Chat.updateOne({
        peerId: peerId
    }, {
        $set: {
        groupType: type
        }
    }),
    addAdmin: (peerId, userId) => {
        Chat.updateOne({
            peerId
        }, {
            $push: {
                admins: userId
            }
        }).then(console.log('Новый админ!'))
    },
    delAdm: (peerId, userId) => {
        Chat.updateOne({
            peerId
        }, {
            $pull: {
                admins: userId
            }
        }).then(console.log('Сняли админа с полномочий'))
    }
}

module.exports = chat