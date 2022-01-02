const { client } = require('tmi.js')
const filesManagers = require('../utils/filesManagers')
const { getUserData } = require('../utils/userManagers')

module.exports = (channel, tags, message, client) => {
    const username = tags.username
    let level = getUserData(username, "level") == null ? 1 : getUserData(username, "level")
    let xp = getUserData(username, "xp") == null ? 0 : getUserData(username, "xp")
    let maxXp = level * 100
    client.say(channel, filesManagers.getSettings("messages", "level_message").replace("%lvl%", level).replace("%xp%", xp).replace("%maxXp%", maxXp))
}