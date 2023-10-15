const { getRandomNumber, createSecretWord, createHash } = require("../../../tools");
const { addGameToList } = require("./gameInfo");

const getFullArray = (arr, value) => arr.fill(arr.length).map((item, index) => value(item, index))

module.exports = ({ chatId, }) => {
    const winNumbers = getFullArray(new Array(37), (item, index) => {
        let colorForNumber;
        
        if ([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(index)) {
            colorForNumber = 'red'
        } else {
            colorForNumber = 'black'
        }
        
                if (index === 0) {
            colorForNumber = 'green'
        }

        return {
            number: {
                winValue: index,
                color: colorForNumber
            },
            winPercent: 100 / 37
        }
    })

    const { winValue: winNumber, color: winColor } = getRandomNumber(winNumbers)

    const secretWord = createSecretWord(`${winNumber}|${winColor}`, 'bigShlepa')

    const hash = createHash(secretWord);

    const gameInfo = {
        chatId: chatId,
        winNumber: winNumber,
        winColor: winColor,
        secretWord: secretWord,
        hash: hash,
        bets: {},
        endTime: null,
    }

    addGameToList(chatId, gameInfo)

    return gameInfo.hash
}
