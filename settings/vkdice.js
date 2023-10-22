const { VKDice, VKDiceCallback } = require('vkdice-api');
const { tokenDice, reserve } = require('./config.json');
const { plusBalanceUser } = require('../database/managers/user');
const { numberWithSpace } = require('./tools');

const vkDice = new VKDice({ key: tokenDice, merchant: reserve });
const vkDiceCallback = new VKDiceCallback(vkDice);

function sendCubes(id, amount){
    return vkDice.api.coins.send({user: id, amount: amount})
}

function whatReserve(){
    return vkDice.api.coins.balance({ user: reserve })
}

function plusCubics(id, sum){
    vkMsg(id, `✅ Баланс пополненен на ${numberWithSpace(sum)} 🎲\n🍀 Приятной игры!`)
    return plusBalanceUser(id, sum)
}

module.exports = {
    vkDice, vkDiceCallback, sendCubes, whatReserve, plusCubics
}