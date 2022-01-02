const { getSettings } = require("../utils/filesManagers");
const { addXp } = require("../utils/userManagers");

module.exports = (client, channel, user)=>{
    Object.entries(user).forEach(([key, value]) => {
        millis = Date.now() - value
        if(Math.floor(millis / 1000) >= getSettings("settings", "afk_timer") * 60){
            delete user[key]
        }else{
            addXp(key, 5, client, channel)
        }
    });

    return user
}