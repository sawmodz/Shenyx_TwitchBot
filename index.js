const filesManagers = require('./utils/filesManagers')
const tmi = require('tmi.js')
const prefixCommande = require('./commands/prefix')

const client = new tmi.Client({
	options: { debug: true },
	identity: {
        username: filesManagers.getSettings("auth", "bot_name"),
		password: filesManagers.getSettings("auth", "password")
	},
	channels: filesManagers.getSettings("auth", "channel_to_connect")
})

client.connect()

client.on("message", (channel, tags, message, self) => {
    if(self) return

    let prefix = filesManagers.getSettings("settings", "prefix")

    switch (message.toLowerCase().split(" ")[0]) {
        case prefix+"prefix" :
            prefixCommande(channel, tags, message, client)
            return;
    }
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