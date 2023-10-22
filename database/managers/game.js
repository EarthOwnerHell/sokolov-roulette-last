const Game = require('../models/Game.js')

const game = {      
    getGame: (peerId) => Game.findOne({ peerId, isEnded: false }).lean(),
    getGameId: (peerId) => Game.findOne({ peerId, isEnded: false }).lean().then(game => game._id.toHexString()),
    createGame: (props) => {
            const { peerId, hash, hashKey, duration, color, number, isEnded } = props
            newGame = new Game({
                peerId,
                hash,
                hashKey,
                duration,
                color,
                number,
                isEnded
            })

            return newGame.save().then(console.log(`--> Новая игра!`))
        },

}

module.exports = game
