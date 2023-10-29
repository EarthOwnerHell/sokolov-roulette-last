const { getUser } = require('../../database/managers/user')
const { inlineProfileBoard, inlineProfileBoardPrivilege } = require('../../keyboards/inline')
const { numberWithSpace } = require('../../settings/tools')
const parsePhoneNumber = require('libphonenumber-js')
const { vk } = require('../../settings/vk')

module.exports = balance = async (msg) => {
    startTime = Date.now()
    const { name, balance, id, bonuseBalance } = await getUser(msg.senderId)
    endTime = Date.now() - startTime
    console.log(`Время выполнения getUser ${endTime/1000}`)
    startTime1 = Date.now()
    await vk.api.messages.send({peer_id: msg.peerId, message: `💰 @id${id}(${name}), твой баланс: ${numberWithSpace(balance.toFixed(0))} 🎲\n\n🎁 Бонусный баланс: ${numberWithSpace(bonuseBalance.toFixed(0))} 🎲`, random_id: 0})
    change = Date.now() - startTime1
    console.log(`скорость выполнения отправки сообщения ${change/1000}`)
}

/*
Для создания MongoDB базы данных на локальном компьютере (localhost), вам потребуется установить MongoDB Community Server и запустить его.

Вот пошаговая инструкция по созданию MongoDB базы данных на localhost:

Установите MongoDB Community Server, следуя инструкциям на официальном сайте MongoDB: https://www.mongodb.com/try/download/community

После установки MongoDB, создайте папку для хранения данных базы данных MongoDB. Например, вы можете создать папку data в корне диска C: (C:\data).

Откройте командную строку или терминал и перейдите в папку, где установлена MongoDB. Например, для стандартной установки на Windows, путь может быть "C:\Program Files\MongoDB\Server<версия>\bin".

Запустите MongoDB сервер с указанием пути к папке данных, созданной на шаге 2. Для этого выполните следующую команду:

Copy
mongod --dbpath C:\data
*/