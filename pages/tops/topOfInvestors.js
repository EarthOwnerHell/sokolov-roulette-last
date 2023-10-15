const { createTopOfInvestors } = require("../../tools")

module.exports = async (msg) => {

    const top = await createTopOfInvestors(msg.senderId)
    
    return msg.send(top)

}