const { connect } = require('mongoose')

module.exports = () => {
    if (!process.env.MONGO_URI) return console.error(new Error('[ ❗ ] Вы не указали ссылку на MongoDB'))

    connect(process.env.MONGO_URI, (err) => {

        if (err) return console.error(new Error('[ ❗ ] Ошибка при подключении MongoDB'))
    
        console.log('[ 🔔 ] Подключились к MongoDB')
    
    })
}