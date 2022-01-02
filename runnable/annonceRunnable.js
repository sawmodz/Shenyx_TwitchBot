const { getSettings } = require("../utils/filesManagers")

module.exports = (client, channel)=>{
    allMessages = getSettings("annonceMessages", "allMessages")
    myMessage = allMessages[Math.floor(Math.random()*allMessages.length)]
    client.say(channel, myMessage)
}