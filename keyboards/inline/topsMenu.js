const { dbUser } = require("../../database/managers/user");
const { numberWithSpace } = require("../../tools");

const addElementToCarousel = ({ title, description, buttons }) => ({
    title,
    description,
    buttons
})

/* 




*/

/*
keyboard([
    [
        textButton({
            label: '',
            payload: 'getTopInvest',
            color: blue
        }),
    ],
    [
        textButton({
            label: '🙋‍♂ Топ по рефералам',
            payload: 'getTopRefs',
            color: blue
        }),
    ]
]).inline()
*/

module.exports = async (userId) => {
    const [ allInvestedPosition, refsCountPosition ] = await Promise.all([dbUser.getTopUserPosition(userId, 0, 'balancesInfo.allInvested'), dbUser.getTopUserPosition(userId, 0, 'refs.count')])
    
    return     JSON.stringify({
        type: 'carousel',
        elements: [
            addElementToCarousel({
                title: '📊 Топ по вложениям', 
                description: `💬 Ваше место: ${numberWithSpace(allInvestedPosition)}`,
                buttons: [
                    {
                        action: {
                            type: 'text',
                            label: '📊 Топ по вложениям',
                            payload: {
                                command: 'getTopInvest',
                                type: 'user'
                            }
                        }
                    },
                ]
            }),
            addElementToCarousel({
                title: '🙋‍♂ Топ по рефералам',
                description: `💬 Ваше место: ${numberWithSpace(refsCountPosition)}`,
                buttons: [
                    {
                        action: {
                            type: 'text',
                            label: '🙋‍♂ Топ по рефералам',
                            payload: {
                                command: 'getTopRefs',
                                type: 'user'
                            }
                        }
                    }
                ]
            }) 
        ],
    })
}
