# About
This is a script for a twitch bot. You can connect to a streams chat with any Twitch account you own via Twitch's API. This script has settings that can be modified specifically for Rocket League. It has the ablity to say things in chat when goals are scored in game. Esentially, it takes a screenshot of the stream every so often and uses Tesseract.js to extract text from the image to check if someone has scored.

## Notice
Not all goals are captured by the bot, depending on a few factors... Certain goal explosions, and longer names where the text can't be perfectly extracted. What you can do is use a shorter display name or/and change your goal explosion to a darker one. This will help constrast the text on top of the goal explosion allowing the script to pick up the text easier.

## Getting Started
- yarn or npm install to install dependencies 
- Get an OAuth token [here] (https://twitchapps.com/tmi/)
- Add OAuth token to template.env file
- Download geckodriver [here] (https://github.com/mozilla/geckodriver)
- Add geckodriver binary to root of project
- Configure path name in "template.env"
- Rename "template.env" to ".env"
- Configure settings in config.json

## Config

### botName
This will be the twitch channel name you are trying to connect to the chat with. The bot will not ignore messages from itself unless it knows what its own name is XD

### channel
The name of the twitch channel the bot is connecting to.

### sayHiOnJoin
If true, bot will say hello to whoever joins your stream, including lurkers. Disabled if false.

### roastOnMessage
If true, bot will roast whoever types in the chat. Disabled if false.

## Config (Rocket League)
All these commands are Rocket League specific. Leave rocketLeagueName empty to disable these features.

### rocketLeagueName
The streamer's display name in Rocket League. By entering a value here a webdriver will open and watch stream for goals. Leave as empty string to disable this (""). 

### playerRefresh
Time to wait before refreshing the player in milliseconds(ms). This is incase of buffering and making sure the player is not behind. Default 27000000(45 minutes).

### screenShotWait
Time to wait in milliseconds(ms) in between checking for goals. Default 1700.

### pageLoadWait
Time to wait in ms before checking for goals on initial load. Default 10000(10 seconds).

### streamerPlatform
The platform the streamer plays Rocket League on(values that can be used: steam, ps, xbox, epic). This is for stat checking with the !rank command.

### platformName
The name that is associated with the streamer platform which is also used for stat checking.

### roastOnScore
If set to true, everytime the streamer scores a goal the bot will say a random funny roast. Disabled if false.

### complimentOnScore
If set to true, everytime the streamer scores a goal the bot will compliment you. Disabled if false.

### roastOnScoredOn
If set to true, everytime the streamer gets scored on the bot will roast them. Disabled if false.

### complimentOnScoredOn
If set to true, everytime the streamer gets scored on the bot will compliment them to feel better. Disabled if false.

## Scripts
### Development
`yarn or npm dev to run on nodemon`

### Run
`yarn or npm start to run script`
