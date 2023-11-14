const { range } = require("../../settings/tools")
const { forCubeTranslate } = require("./gameTools")
const { getRandomValue, getRandomValueByPercentage } = require("./hash")

const randomDependingMode = {
    'wheel': function() {
    const values = [
        { name: 0, percentage: 1 },
        { name: 1, percentage: 3 },
        { name: 2, percentage: 3 },
        { name: 3, percentage: 3 },
        { name: 4, percentage: 3 },
        { name: 5, percentage: 3 },
        { name: 6, percentage: 3 },
        { name: 7, percentage: 3 },
        { name: 8, percentage: 3 },
        { name: 9, percentage: 3 },
        { name: 10, percentage: 3 },
        { name: 11, percentage: 3 },
        { name: 12, percentage: 3 },
        { name: 13, percentage: 3 },
        { name: 14, percentage: 3 },
        { name: 15, percentage: 3 },
        { name: 16, percentage: 3 },
        { name: 17, percentage: 3 },
        { name: 18, percentage: 3 },
        { name: 19, percentage: 3 },
        { name: 20, percentage: 3 },
        { name: 21, percentage: 3 },
        { name: 22, percentage: 3 },
        { name: 23, percentage: 3 },
        { name: 24, percentage: 3 },
        { name: 25, percentage: 3 },
        { name: 26, percentage: 3 },
        { name: 27, percentage: 3 },
        { name: 28, percentage: 3 },
        { name: 29, percentage: 3 },
        { name: 30, percentage: 3 },
        { name: 31, percentage: 3 },
        { name: 32, percentage: 3 },
        { name: 33, percentage: 3 },
        { name: 34, percentage: 3 },
        { name: 35, percentage: 3 },
        { name: 36, percentage: 3 }
    ];
    const number = getRandomValueByPercentage(values)
    const checkForRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number)
    const color = checkForRed ? 'red' : number == 0 ? 'zero' : 'black' 
    const numberType = number % 2 == 0 && number != 0 ? 'even' : number % 2 >= 1 && number != 0 ? 'odd' : ""
    const interval = range(1, 12).includes(number) ? '1-12' : range(13, 24).includes(number) ? '13-24' : range(25, 36).includes(number) ? '25-36' : 0
    return [number, color, interval, numberType]
    },
    'cube' : function(){
        const values = [
            { name: 1, percentage: 17 },
            { name: 2, percentage: 17 },
            { name: 3, percentage: 17 },
            { name: 4, percentage: 17 },
            { name: 5, percentage: 17 },
            { name: 6, percentage: 17 },
        ];
    
    const number = getRandomValueByPercentage(values)
    const numberType = number % 2 == 0 ? 'even' : 'odd'
    return [number, numberType, forCubeTranslate[number]]
    },
    'double': function() {
    const values = [
        { name: '2X', percentage: 50 },
        { name: '3X', percentage: 35 },
        { name: '5X', percentage: 12 },
        { name: '10X', percentage: 3 }
        ];
    const coefficent = getRandomValueByPercentage(values)
    return [coefficent]
    },
    'l7m' : function(){
        const values = [
            { name: 2, percentage: 9 },
            { name: 3, percentage: 9 },
            { name: 4, percentage: 9 },
            { name: 5, percentage: 9 },
            { name: 6, percentage: 9 },
            { name: 7, percentage: 3 },
            { name: 8, percentage: 9 },
            { name: 9, percentage: 9 },
            { name: 10, percentage: 9 },
            { name: 11, percentage: 9 },
            { name: 12, percentage: 9 },
        ];
    const number = getRandomValueByPercentage(values)
    const numberType = number < 7 ? 'less' : number > 7 ? 'more' : 'seven'
    return [number, numberType]
    },
    'dice' : function() {
        const values = [
            { name: 0, percentage: 1 },
            { name: 1, percentage: 8 },
            { name: 2, percentage: 8 },
            { name: 3, percentage: 8 },
            { name: 4, percentage: 8 },
            { name: 5, percentage: 8 },
            { name: 6, percentage: 8 },
            { name: 7, percentage: 8 },
            { name: 8, percentage: 8 },
            { name: 9, percentage: 8 },
            { name: 10, percentage: 8 },
            { name: 11, percentage: 8 },
            { name: 12, percentage: 8 },
        ];
    const number = getRandomValueByPercentage(values)
    const checkForWhite = [1, 3, 5, 7, 9, 11].includes(number)
    const color = checkForWhite ? 'white' : number == 0 ? 'golden' : 'black' 
    const numberType = number % 2 == 0 ? 'even' : 'odd'
    const interval = range(1, 4).includes(number) ? '1-4' : range(5, 8).includes(number) ? '5-8' : range(9, 12).includes(number) ? '9-12' : 0
    return number == 0 ? [number, color, interval, numberType, 'Золото'] : [number, color, interval, numberType]
    }
}

function totalValues(array){
    let forHash = ''     
    const check = [1, 2].includes(array.length)
    check ? forHash = `${array[0]}|` : forHash = `${array[0]}|${array[1]}|`
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
    
