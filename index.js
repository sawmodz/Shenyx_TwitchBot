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