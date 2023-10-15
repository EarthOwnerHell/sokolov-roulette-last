const dbGlobal = require("../../database/managers/global")

module.exports = async (msg) => {
    const value = await msg.question('Напишите новое значение курса пополнений (ЕСЛИ У ЧИСЛА ДЕСЯТИЧНАЯ ЧАСТЬ, ТО ЧЕРЕЗ ТОЧКУ (10.00) )')

    if (!Number(value.text)) return msg.send('перепроверь данные')

    msg.send('Успешно, амогусик')

    dbGlobal.setRefBonuse(Number(value.text))
}