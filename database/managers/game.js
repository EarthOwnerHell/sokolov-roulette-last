const Game = require('../models/Game.js')

const game = {      
    getGame: (peerId) => Game.findOne({ peerId, isEnded: false }).lean(),
    getGames: () => Game.find({ isEnded: false }).lean(),
    getGameId: (peerId) => Game.findOne({ peerId, isEnded: false }).lean().then(game => game._id.toHexString()),
    createGame: async (props) => {
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

            try {
                const savedGame = await game.save();
                const newObjectId = savedGame._id;
                console.log('--> Новая игра! ', newObjectId);
                return savedGame; 
              } catch (err) {
                console.error(err);
                throw err;
              }
        },
    startEndTime: (gameId, endTime) => Game.findByIdAndUpdate(gameId, { endTime: Date.now() + endTime }, {new: true}).lean().exec(),
    changeGameStatus: (gameId) => Game.findByIdAndUpdate(gameId, { isEnded: true }, { new: true }).lean().exec(),
    deleteGame: (gameId) => Game.findByIdAndDelete(gameId).lean().exec(),

}

module.exports = game
