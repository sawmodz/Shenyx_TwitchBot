const PATH = "./user/"
const { channel } = require("diagnostics_channel")
const fs = require("fs")
const { getSettings } = require("./filesManagers")

const getUserData = (file, parameters) => {
    return readData(file)[parameters]
}

const pathExist = (path) => {
    return fs.existsSync(path)
}

const addXp = (username, addXp, client) =>{
    let level = getUserData(username, "level") == null ? 1 : getUserData(username, "level")
    let xp = getUserData(username, "xp") == null ? 0 : getUserData(username, "xp")
    let maxXp = level * 100
    xp += addXp
    if(xp >= maxXp){
        level += 1
        xp = 0
        client.say(channel, getSettings("messages", "level_up").replace("%username%", username).replace("%level%", level))
    }

    setData(username, "xp", xp)
    setData(username, "level", level)
}

const removeData = (file, key) => {
    try {
        let data = readData(file)

        delete data[key]

        fs.writeFileSync(PATH+file+".json", JSON.stringify(data))
    } catch (error) {
        console.error(error)
    }
}

const setData = (file, key, value) => {
    try {
        let data = readData(file)

        data[key] = value

        fs.writeFileSync(PATH+file+".json", JSON.stringify(data))
    } catch (error) {
        console.error(error)
    }
}

const readData = (file) => {
    let path = PATH+file+".json"
    let data = {}

    if(pathExist(path))
        data = JSON.parse(fs.readFileSync(path))

    return data
}

module.exports = {getUserData, setData, removeData, addXp}