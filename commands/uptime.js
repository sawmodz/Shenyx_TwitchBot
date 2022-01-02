const { client } = require('tmi.js')
const filesManagers = require('../utils/filesManagers')
const request = require('request');

module.exports = (channel, tags, message, client) => {
    const options = {
        'method': 'GET',
        'url': 'https://decapi.me/twitch/uptime?channel='+channel.replace("#", ""),
    }
    
    request(options, function (error, response) {
        if (error) throw new Error(error)
        const status = response.body
        if(status.split(" ")[2] == "offline"){
            client.say(channel, filesManagers.getSettings("messages", "uptime_offline").replace("%channel%", channel.replace("#", "")))
        }else{
            client.say(channel, filesManagers.getSettings("messages", "uptime_online").replace("%time%", status))
        }
    })
}