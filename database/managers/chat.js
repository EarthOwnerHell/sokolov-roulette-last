const Chat = require("../models/chat")

const chat = {
    getChat: (peerId) => Chat.findOne({ peerId }).lean(),
    createChat: (props) => {
        const { peerId, botAdmin } = props
        const chat = new Chat({
            peerId,
            botAdmin
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