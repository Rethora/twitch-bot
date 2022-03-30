require('dotenv').config();
const { default: axios } = require('axios');
const tmi = require('tmi.js');
const tmp = require('tmp');
const { getPlayer, goalScored, sleep } = require('./util');
const {
  roasts,
  greetings,
  scoredMessages,
  defaultChatters,
  commands,
  modCommands,
  spamMatches,
  goodbyes
} = require('./assets');

const {
  botName,
  channel,
  enableCommands,
  sayHiOnJoin,
  roastOnMessage,
  rocketLeagueName,
  playerRefresh,
  screenShotWait,
  pageLoadWait,
  streamerPlatform,
  platformName,
  roastOnScore,
  complimentOnScore,
  roastOnScoredOn,
  complimentOnScoredOn
} = require('./config.json')

// storage
let usedRoasts = [];
let usedCompliments = [];
let chatters = { [channel]: { reputation: 0 } };
// global state
let currentTask;
let gameOfTagTask = {};

// connect to client
const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: botName,
    password: process.env.OAUTH_TOKEN
  },
  channels: [channel]
});
client.connect();

// goal watcher
const setTask = (player, rocketLeagueName, tmpdir, delay) => setInterval(async () => {
  const scored = await goalScored(player, rocketLeagueName, tmpdir);
  console.log(scored)
  if (scored === 'streamer' && roastOnScore) client.say(channel, `@${channel} ${getRandomRoast()}`);
  if (scored === 'streamer' && complimentOnScore) client.say(channel, `@${channel} ${getRandomCompliment()}`)
  if (scored === 'oponent' && roastOnScoredOn) client.say(channel, `@${channel} ${getRandomRoast()}`)
  if (scored === 'oponent' && complimentOnScoredOn) client.say(channel, `@${channel} ${getRandomCompliment()}`)
  if (scored) sleep(3000);
}, delay)
const clearTask = (task) => {
  clearInterval(task);
}
const handleWatch = async (channel, pageLoadWait) => {
  // await loadWorker()
  const td = tmp.dirSync({ mode: 0750, prefix: 'TwitchBotTmp', unsafeCleanup: true });
  const tmpdir = td.name;
  const player = await getPlayer(channel, pageLoadWait);
  currentTask = setTask(player, rocketLeagueName, tmpdir, screenShotWait);
  setInterval(async () => {
    clearTask(currentTask);
    player.navigate().refresh();
    await player.sleep(pageLoadWait);
    currentTask = setTask(player, rocketLeagueName, tmpdir, screenShotWait);
  }, playerRefresh)
}

// run continuously to check if streamer scores a goal
if (rocketLeagueName) handleWatch(channel, pageLoadWait);

// say hi to user when they join the chat
client.on('join', (c, username, self) => {
  chatters[username] = { reputation: 0 };
  if (!self && username !== channel && !defaultChatters.includes(username)) {
    if (sayHiOnJoin) {
      client.say(channel, `@${username} ${sayHello()} <3 I'm a bot! :D Use [ !help ] to see list of available commands or just stay and chat.`);
    }
  }
})

// run when user enters a message in chat
client.on('message', async (channel, tags, message, self) => {
  if (self) return;

  const args = message.slice(1).split(' ');
  let command = args.shift().toLowerCase();

  if (roastOnMessage) client.say(channel, `@${tags.username} ${getRandomRoast()}`);

  if (enableCommands) {
    if (args[0] !== "help") {
      // user commands
      if (command === "leave") {
        if (_checkMod(client, channel, tags.username)) {
          client.say(channel, sayGoodBye());
          client.part(channel);
        }
        else client.say(channel, "Only the streamer or a mod can use this command.");
      }
      if (command === "help") client.say(channel, `Supported commands: ${printHelp()}`);
      if (command === "hello" || command === "hi" || command === "hey" || command === "yo") client.say(channel, `@${tags.username} ${sayHello()} <3`);
      if (command === "dice") client.say(channel, `@${tags.username} rolled a ${rollDice()}`);
      if (command === "rps") playRPS(channel, tags.username, args[0]);
      if (command === "roast") client.say(channel, `@${tags.username} ${getRandomRoast()}`);
      if (command === "rep") handleRep(client, channel, tags, args);
      if (command === "tag") handleGameOfTag(client, channel, tags, args);
      if (command === "rank") {
        if (!streamerPlatform || !platformName) client.say(channel, `@${tags.username} this feature isn't currently set up.`);
        else if (!rocketLeagueName) client.say(channel, `@${tags.username} This command only shows rank when ${channel} is playing rocket league.`)
        else {
          try {
            const rlRank = await _fetchRlRank(streamerPlatform, platformName);
            client.say(channel, rlRank);
          } catch (err) {
            console.error(err);
            client.say(channel, `Could not retrieve ${channel}'s rank.`);
          }
        }
      }
      // mod commands
      if (client.isMod(channel, botName)) {
        if (_spamDetected(message)) {
          client.say(channel, `Get out of here you inferior bot!`);
          client.deletemessage(channel, tags.id);
        }
        if (command === "clear") {
          if (_checkMod(client, channel, tags.username)) client.clear(channel);
          else client.say(channel, `@${tags.username} You must have mod privileges to use this command!`);
        }
        if (command === "ban") {
          if (_checkMod(client, channel, tags.username)) client.ban(channel, args.shift().toLowerCase(), args.join(" "));
          else client.say(channel, `@${tags.username} You must have mod privileges to use this command!`);
        }
        if (command === "unban") {
          if (_checkMod(client, channel, tags.username)) client.unban(channel, args.shift());
          else client.say(channel, `@${tags.username} You must have mod privileges to use this command!`);
        }
      }
    }
    else {
      if (command === "rps") command = "rps <move>";
      if (command === "ban") command = "ban <username> <reason>";
      if (command === "unban") command = "unban <username>";
      if (command === "rep") command = "rep <username> <+/- reputation>";
      if (command === "tag") command = "tag <username>";
      let helpText;
      try {
        helpText = commands[command].help;
      }
      catch (err) {
        helpText = modCommands[command].help
      }
      client.say(channel, `@${tags.username}, Command [ !${command} ]: ${helpText}.`);
    }
  }

});

// run when streamer scores a goal
client.on('streamer-scored-goal', (channel) => {
  if (roastOnScore) client.say(channel, `@${channel} ${getRandomRoast()}`);
  else if (!roastOnScore) client.say(channel, `@${channel} ${getRandomCompliment()}`);
})

// commands
const getRandomRoast = () => {
  if (usedRoasts.length === roasts.length) usedRoasts = [];
  let idx = _getRandomIdx(roasts.length);
  while (usedRoasts.includes(idx)) {
    idx = _getRandomIdx(roasts.length);
  }
  return roasts[idx];
}
const getRandomCompliment = () => {
  if (usedCompliments.length === scoredMessages.length) usedCompliments = [];
  let idx = _getRandomIdx(scoredMessages.length);
  while (usedCompliments.includes(idx)) {
    idx = _getRandomIdx(scoredMessages.length);
  }
  return scoredMessages[idx];
};
const printHelp = () => {
  let str = "";
  Object.keys(commands).forEach(k => str += `[ !${k} ] `);
  str += "| Or use a command followed by the help flag to see how the command works. EX: !dice help. ";
  str += "If this bot is a mod on the streamer's channel, the streamer and mods can use the commands: ";
  Object.keys(modCommands).forEach(k => str += ` [ !${k} ] `);
  return str;
}
const playRPS = (channel, player, move) => {
  const plays = ['rock', 'paper', 'scissors'];
  const computerMove = plays[_getRandomIdx(plays.length)];

  switch (move) {
    case 'r':
      move = 'rock';
      break;
    case 'p':
      move = 'paper';
      break;
    case 's':
      move = 'scissors';
      break;
  }

  if (!plays.includes(move))
    client.say(
      channel, `@${player} Invalid move for Rock Paper Scissors. Use '!rps help' to see how to play.`
    );
  else {
    const beats = { rock: 'paper', paper: 'scissors', scissors: 'rock' };
    let outcome;
    let output = `You chose ${move}, I chose ${computerMove}. `;

    if (move === computerMove) outcome = 'It was a tie.';
    else if (move === beats[computerMove]) outcome = 'You win!';
    else if (computerMove === beats[move]) outcome = 'I win.';

    output += outcome;
    client.say(channel, `@${player} ${output}`);
  }
}
const handleRep = (client, channel, tags, args) => {
  if (!args.length) client.say(channel, `@${tags.username} You currently have a reputaion of ${chatters[tags.username].reputation}`)
  else {
    let userArg = args.shift().toLowerCase();
    if (userArg.includes("@")) userArg = userArg.replace("@", "");
    if (!args.length) {
      try {
        client.say(channel, `@${userArg} currently has a reputation of ${chatters[userArg].reputation}`)
      } catch (err) {
        client.say(channel, `@${tags.username} You can't get the reputation of someone who is not in the chat.`)
      }
    }
    else {
      let repArg = args.join("");
      if (!chatters[userArg]) client.say(channel, `@${tags.username} You can't adjust reputation of a channel that is not in the chat.`)
      else if (userArg === tags.username) client.say(channel, `@${tags.username} You can't adjust your own rep. Adjust another chatter's reputation!`)
      else {
        if (!repArg.match(/(^\+|^-) ?\d+/))
          client.say(channel, `@${tags.username} Invalid arguments for adjusting rep. Use [ !rep help ] to see how to use this command.`)
        else {
          repArg = repArg.match(/(^\+|^-) ?\d+/)[0];
          if (repArg.includes("-")) {
            repArg = repArg.replace("-", "").replace(/\D+/, "");
            const currRep = chatters[userArg].reputation;
            const newRep = currRep - parseInt(repArg);
            chatters[userArg].reputation = newRep;
          }
          else if (repArg.includes("+")) {
            repArg = repArg.replace("+", "").replace(/\D+/, "");
            const currRep = chatters[userArg].reputation;
            const newRep = currRep + parseInt(repArg);
            chatters[userArg].reputation = newRep;
          }
          client.say(channel, `@${userArg} now has a reputation of ${chatters[userArg].reputation}.`);
        }
      }
    }
  }
}
const handleGameOfTag = (client, channel, tags, args) => {
  const clockResetMs = 300000;
  if (!args.length) client.say(channel, `$@${tags.username} No argument supplied for !tag. Use [ !tag help ] to see how to play.`)
  else if (args[0] === tags.username) client.say(channel, `@${tags.username} You can't tag yourself! Tag someone else in chat...`)
  else if (!Object.keys(gameOfTagTask).length) {
    let userArg = args[0];
    if (userArg.includes("@")) userArg = userArg.replace("@", "");
    try {
      let userRep = chatters[userArg].reputation;
      if (userArg === botName) {
        while (userArg === botName) {
          const randomChatterIdx = _getRandomIdx(Object.keys(chatters).length);
          userArg = Object.keys(chatters)[randomChatterIdx];
        }
        client.say(channel, `I'm now it, but I tag @${userArg}!`);
      }
      gameOfTagTask.it = userArg;
      gameOfTagTask.startedAt = Date.now();
      client.say(channel, `@${userArg} is now it. LUL They have 5 minutes to tag someone else before the timer resets.`);
      gameOfTagTask.timer = setTimeout(() => {
        gameOfTagTask = {};
        client.say(channel, `@${userArg} did not tag anyone. The timer has been reset. Anybody can tag again!`);
      }, clockResetMs);
    } catch (err) {
      client.say(channel, `@${tags.username} you can't tag someone who is not in the chat.`);
    }
  }
  else {
    if (tags.username !== gameOfTagTask.it)
      client.say(channel, `@${tags.username} You are not it. @${gameOfTagTask.it} has ${_msToMinutesAndSeconds(clockResetMs - (Date.now() - gameOfTagTask.startedAt))} left to tag someone!`)
    else {
      let userArg = args[0];
      try {
        let userRep = chatters[userArg].reputation;
        if (userArg === botName) {
          while (userArg === botName) {
            const randomChatterIdx = _getRandomIdx(Object.keys(chatters).length);
            userArg = Object.keys(chatters)[randomChatterIdx];
          }
          client.say(channel, `I'm now it, but I tag @${userArg}!`);
        }
        clearTimeout(gameOfTagTask.timer);
        gameOfTagTask.it = userArg;
        gameOfTagTask.startedAt = Date.now();
        client.say(channel, `@${userArg} is now it. LUL They have 5 minutes to tag someone else before the timer resets.`);
        gameOfTagTask.timer = setTimeout(() => {
          gameOfTagTask = {};
          client.say(channel, `@${userArg} did not tag anyone. The timer has been reset. Anybody can tag again!`);
        }, clockResetMs);
      } catch (err) {
        client.say(channel, `@${tags.username} you can't tag someone who is not in the chat.`);
      }
    }
  }
}
const sayHello = () => greetings[_getRandomIdx(greetings.length)];
const sayGoodBye = () => goodbyes[_getRandomIdx(goodbyes.length)];
const rollDice = () => _getRandomIdx(5) + 1;

// static helpers
const _getRandomIdx = len => Math.floor(Math.random() * len);
const _fetchRlRank = async (streamerPlatform, name) => {
  const url = `https://api.yannismate.de/rank/${streamerPlatform}/${name}?playlists=ranked_1v1,ranked_2v2,ranked_3v3,hoops,rumble,dropshot,snowday,tournaments`;
  const { data } = await axios.get(url);
  return data;
}
const _checkMod = (c, channel, username) => {
  if (c.isMod(channel, username)) return true;
  if (`#${username}` === channel) return true;
  return false;
}
const _spamDetected = (msg) => {
  return spamMatches.some(m => msg.toLowerCase().includes(m));
}
const _msToMinutesAndSeconds = (ms) => {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
