const dbGlobal = require("../../database/managers/global")




module.exports = async (msg) => {

    const { hackPercent } = await dbGlobal.get();

    const newHackPercent = await msg.question(`Введи новый хек пирцент, нынешний ${hackPercent}`);
    
    if (!Number(newHackPercent.text) || Number(newHackPercent.text) <= 0) return msg.send('Неверное значение, папробуйти позжи');

    msg.send(`Успешно установили хек перцент на ${newHackPercent.text}`)

    dbGlobal.setHeckPercent(Number(newHackPercent.text))

}