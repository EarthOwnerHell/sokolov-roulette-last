const gameList = {};

const getGame = (peerId) => gameList[peerId]

const getBets = (peerId) => gameList[peerId]?.bets

const deleteGameFromList = (peerId) => delete gameList[peerId]

const getGames = () => gameList

const getUserBet = (peerId, userId) => {
    const bets = getBets(peerId)

    if (!bets) return {};

    const userBets = bets[userId]

    return userBets || {}
}

const checkBetUserValueInBets = ({ peerId, userId, betValue, betType }) => {
    const userBets = getUserBet(peerId, userId);

    if (!Object.keys(userBets).length) return true;

    return userBets[betType].value === betValue || !userBets[betType].value ? true : false
}

const addGameToList = (peerId, gameInfo) => gameList[peerId] = gameInfo

const addUserToBets = (peerId, userId) => {
    return getBets(peerId)[userId] = {
        number: {
            value: null,
            amount: 0
        },
        color: {
            value: null,
            amount: 0
        },
        diaposon: {
            value: null,
            amount: 0
        },
        typeNumber: {
            value: null,
            amount: 0
        },
    }
}

const addBetToGame = ({ peerId, userId, betValue, betType, betAmount }) => {
    const userBetGroups = getUserBet(peerId, userId)

    const userBet = !Object.keys(userBetGroups).length ? addUserToBets(peerId, userId)[betType] : userBetGroups[betType]
    
    userBet.value = betValue;
    userBet.amount += betAmount;

    if (!gameList[peerId].endTime) {
        gameList[peerId].endTime = Date.now() + 30_000
    }
}

module.exports = {
    getGame,
    getBets,
    addBetToGame,
    addGameToList,
    getUserBet,
    checkBetUserValueInBets,
    getGames,
    deleteGameFromList,
}
