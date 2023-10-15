const { createTopOfRefs } = require("../../tools")

module.exports = async (msg) => {

    const top = await createTopOfRefs(msg.senderId)
    
    return msg.send(top)

}