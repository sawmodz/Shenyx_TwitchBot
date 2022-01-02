const filesManagers = require('./utils/filesManagers')
const tmi = require('tmi.js')
const prefixCommande = require('./commands/prefix')
const annonceRunnable = require('./runnable/annonceRunnable')
const random = require('./commands/random')
const addCommands = require('./commands/addCommands')
const removeCommands = require('./commands/removeCommands')
const changeCommands = require('./commands/changeCommands')
const adddomain = require('./commands/addDomain')
const removeDomain = require('./commands/removeDomain')
const uptime = require('./commands/uptime')
const level = require('./commands/level')
const { addXp } = require('./utils/userManagers')
const levelRunnable = require('./runnable/levelRunnable')

let actifUser = {}

const client = new tmi.Client({
	options: { debug: true },
	identity: {
        username: filesManagers.getSettings("auth", "bot_name"),
		password: filesManagers.getSettings("auth", "password")
	},
	channels: filesManagers.getSettings("auth", "channel_to_connect")
})

client.connect().then(()=>{
    filesManagers.getSettings("auth", "channel_to_connect").forEach(channel => {
        setInterval(()=>annonceRunnable(client, "#"+channel), filesManagers.getSettings("settings", "annonce_timer") * 1000 * 60)
        setInterval(() => actifUser = levelRunnable(client, channel, actifUser), filesManagers.getSettings("settings", "reward_timer") * 1000 * 60);
    })
})

function validURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
      '((\\d{1,3}\\.){3}\\d{1,3}))'+
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
      '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(str);
}

const checkAcceptedLink = (message, channel, tags) => {
    const isURL = validURL(message)
    if(isURL){
        const regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/igm;
        let m;
        let mylastdomain;
        while ((m = regex.exec(message)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            m.forEach((match, groupIndex) => {
                mylastdomain = match
            })
        }
        
        whitelistDomain = filesManagers.getSettings("whitelistDomain", "whitelistDomains")

        if(!whitelistDomain.includes(mylastdomain)){
            if(tags.mod || tags.badges != null && tags.badges["broadcaster"] == "1"){
                return;   
            }else{
                client.deletemessage(channel, tags.id)
            }
        }
    }
}

client.on("message", (channel, tags, message, self) => {
    if(self) return

    let prefix = filesManagers.getSettings("settings", "prefix")

    if(actifUser[tags.username] != undefined){
        delete actifUser[tags.username]
    }

    actifUser[tags.username] = Date.now()

    switch (message.toLowerCase().split(" ")[0]) {
        case prefix+"prefix" :
            prefixCommande(channel, tags, message, client)
            return;
        case prefix+"random" :
            random(channel, tags, message, client, prefix)
            return;
        case prefix+"addcommand":
            addCommands(channel, tags, message, client, prefix)
            return;
        case prefix+"removecommand":
            removeCommands(channel, tags, message, client, prefix)
            return;
        case prefix+"changecommand":
            changeCommands(channel, tags, message, client, prefix)
            return;
        case prefix+"adddomain":
            adddomain(channel, tags, message, client, prefix)
            return;
        case prefix+"removedomain":
            removeDomain(channel, tags, message, client, prefix)
            return;
        case prefix+"uptime":
            uptime(channel, tags, message, client)
            return;
        case prefix+"lvl":
            level(channel, tags, message, client)
            return;
        case prefix+"level":
            level(channel, tags, message, client)
            return;
    }

    if(message.startsWith(prefix)){
        if(filesManagers.getSettings("customCommands", message.toLowerCase().split(" ")[0]) != undefined){
            client.say(channel, filesManagers.getSettings("customCommands", message.toLowerCase().split(" ")[0]))
            return;
        }
    }

    checkAcceptedLink(message, channel, tags)
    addXp(tags.username, 10, client, channel)
})

client.on("subscription", (channel, username, method, message, userstate) => {
    client.say(channel, filesManagers.getSettings("messages", "sub_message").replace("%username%", username))
});

client.on("anongiftpaidupgrade", (channel, username, userstate) => {
    client.say(channel, filesManagers.getSettings("messages", "continue_anonyme_subgift").replace("%username%", username))
});

client.on("giftpaidupgrade", (channel, username, sender, userstate) => {
    client.say(channel, filesManagers.getSettings("messages", "continue_subgift").replace("%username%", username).replace("%sender%", sender))
});

client.on("resub", (channel, username, months, message, userstate, methods) => {
    client.say(channel, filesManagers.getSettings("messages", "resub").replace("%username%", username).replace("%months%", months))
});

client.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
    client.say(channel, filesManagers.getSettings("messages", "subgift").replace("%username%", username).replace("%recipient%", recipient))
});

client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
    client.say(channel, filesManagers.getSettings("messages", "subgiftmystery").replace("%username%", username).replace("%numbOfSubs%", numbOfSubs))
});