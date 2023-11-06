const { getRandomValue, getRandomValueByPercentage } = require("./hash")

const randomDependingMode = {
    'wheel': function() {
    let number = getRandomValue(0, 36)
    let color = ''
    [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number) ? color = 'red' : number == 0 ? color = 'zero' : color = 'black' 
    return { 'color': color, 'number': number }
    },
    'cube' : function(){
    const number = getRandomValue(1, 6)
    return { 'number': number }
    },
    'double': function() {
    const values = [
        { name: '2X', percentage: 50 },
        { name: '3X', percentage: 35 },
        { name: '5X', percentage: 12 },
        { name: '10X', percentage: 3 }
        ];
    const coefficent = getRandomValueByPercentage(values)
    return { 'coefficent' : coefficent }
    },
    'l7m' : function(){
    const number = getRandomValue(1, 7)
    return { 'number': number }
    },
    'dice' : function() {
    let number = getRandomValue(0, 12)
    let color = ''
    [1, 3, 5, 7, 9, 11].includes(number) ? color = 'white' : number == 0 ? color = 'golden' : color = 'black'
    number == 0 ? number = 'Золото' : ''
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
    