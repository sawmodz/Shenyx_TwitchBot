const { client } = require('tmi.js')
const filesManagers = require('../utils/filesManagers')

module.exports = (channel, tags, message, client, prefix) => {
    const min = message.toLowerCase().split(" ")[1]
    const max = message.toLowerCase().split(" ")[2]

    if(min != null && max != null){
        client.say(channel, filesManagers.getSettings("messages", "show_random_number").replace("%number%", randomIntFromInterval(min, max)))
    }else{
        client.say(channel, filesManagers.getSettings("messages", "error_on_number").replace("%prefix%", prefix))
    }
}

const randomIntFromInterval = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }