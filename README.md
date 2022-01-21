# Shenyx's Project
## How to config
 1. Go to **config/auth.json**
 2. change on **password** the **changeME**  to oauthToken (you can have this on [twitchapps](https://twitchapps.com/tmi/) and get acces token)
 3. change on **bot_name** the **changeME** to the name of account of bot
 4. change on **channel_to_connect** the **changeME** to the name of twitch channel where the bot must be connect

After this

 1. Go to **config/messages.json**
 2. you can change message here

## How to install bot
Go on your laptop and install Node https://nodejs.org/en/

open terminal on folder where project is
```bash
$ git clone https://github.com/sawmodz/Shenyx_TwitchBot
$ cd Shenyx_TwitchBot
$ npm i
$ node ./index.js
```

## What is that file ?

here is a description of all files on `./config`

- **annonceMessages.json** : In it they will have to put all the messages for the automatic announcements
- **auth.json** : In it they will have to put all the information of connection for the bot
- **customCommands.json** : Inside there will be all the custom commands, but I don't recommend to touch them
- **messages.json** : Inside there are all the messages that the bots send you can modify them as you want
- **settings.json** : in this one there are all the little settings for the bot
- **whitelistDomain.json** : as in customsCommands in it there are all the whitelist domains but I also advise not to touch them

## Problem
if you have a problem you can contact me on **[fiverr](https://www.fiverr.com/blizz_)** or via discord **Blizz#6699**


