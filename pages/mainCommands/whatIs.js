const { articleAboutCubics } = require('../../keyboards/inline')

module.exports = whatIs = async (msg) => {
    return msg.send(`ℹ @diceys(Кубики) - виртуальная валюта, созданная специально для таких проектов, как наш.\n\n❕Её можно покупать, переводить, а самое главное продавать за реальные деньги в маркетах (боты, продающие и скучающие Кубики автоматически). Подробнее об этом можно почитать в статье, прикрепленной ниже.`, {keyboard: articleAboutCubics})

}
