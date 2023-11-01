const { getRandomValue } = require("./hash")

const randomDependingMode = {
    'wheel': function() {
    let number = getRandomValue(0, 36)
    let color = getRandomValue(0, 1)
    color == 0 && number != 0 ? color = 'red' : color == 1 && number != 0 ? color = 'black' : color = 'zero'
    return { 'color': color, 'number': number }
    },
    'cube' : function(){
    const number = getRandomValue(1, 6)
    return { 'number': number }
    },
    'double': function() {
    let coefficent = getRandomValue(1, 4)
    coefficent == 1 ? coefficent = '2X' : coefficent == 2 ? coefficent = '3X' : coefficent == 3 ? coefficent = '5X' : coefficent = '10X'
    return { 'coefficent' : coefficent }
    },
    'l7m' : function(){
    const number = getRandomValue(1, 7)
    return { 'number': number }
    },
    'dice' : function() {
    let number = getRandomValue(0, 12)
    let color = getRandomValue(0, 1)
    number == 0 ? number = 'Золото' : ''
    color == 0 && number != 'Золото' ? color = 'white' : color == 1 && number != 'Золото' ? color = 'black' : color = 'golden'
    return { 'color': color, 'number': number }
    }
}

function totalValues(array){
    let forHash = ''
    array.forEach(element => {
        forHash += `${element}|`
    });
    return forHash
}

function makeArrayFromObject(object){
    const allValues = Object.entries(object);
    let total = []
    for (let i = 0; i < allValues.length; i++){
        const value = allValues[i][1]
        total.push(value)
    }
    return total
}

module.exports = { randomDependingMode, totalValues, makeArrayFromObject }
    