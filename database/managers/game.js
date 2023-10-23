const Game = require('../models/Game.js')

const game = {      
    getGame: (peerId) => Game.findOne({ peerId, isEnded: false }).lean(),
    getGames: () => Game.find({ isEnded: false }).lean(),
    getGameId: (peerId) => Game.findOne({ peerId, isEnded: false }).lean().then(game => game._id.toHexString()),
    createGame: (props) => {
            const { peerId, hash, hashKey, gameMode, endTime, results, isEnded } = props
            const game = new Game({
                peerId,
                hash,
                hashKey,
                gameMode,
                endTime,
                results,
                isEnded
            })

            game.save().then(console.log(`--> Новая игра!`))
        },

}

module.exports = game
