const { client } = require('tmi.js')
const filesManagers = require('../utils/filesManagers')

module.exports = (channel, tags, message, client, prefix) => {
    if(tags.mod || tags.badges != null && tags.badges["broadcaster"] == "1"){
        let args =  message.toLowerCase().split(" ")
        if(args.length == 2){
            const domainName = args[1]
            let domainList = filesManagers.getSettings("whitelistDomain", "whitelistDomains")

            if(!domainList.includes(domainName)){
                domainList.push(domainName)
                filesManagers.setData("whitelistDomain", "whitelistDomains", domainList)
                client.say(channel, filesManagers.getSettings("messages", "ok_addDomain").replace("%domain%", domainName))
            }else{
                client.say(channel, filesManagers.getSettings("messages", "already_exist_addDomain").replace("%domain%", domainName))
            }
        }else{
            client.say(channel, filesManagers.getSettings("messages", "error_on_addDomain").replace("%prefix%", prefix))
        }
    }
}