const roasts = [
	"You're the reason God created the middle finger.",
	"Your secrets are always safe with me. I never even listen when you tell me them.",
	"You bring everyone so much joy when you leave the room.",
	"I may love to shop but I will never buy your bull.",
	"I'd give you a nasty look but you've already got one.",
	"Someday you'll go far. I hope you stay there.",
	"Were you born this stupid or did you take lessons?",
	"The people who tolerate you on a daily basis are the real heroes.",
	"You should really come with a warning label.",
	"I don't know what your problem is, but I'm guessing it's hard to pronounce.",
	"If I wanted to hear from an asshole, I'd fart.",
	"It's kind of hilarious watching you try to fit your entire vocabulary into one sentence.",
	"You look like something that came out of a slow cooker.",
	"I will ignore you so hard you will start doubting your existence.",
	"Feed your own ego. I'm busy.",
	"I'll never forget the first time we met. But I'll keep trying.",
	"You're a grey sprinkle on a rainbow cupcake.",
	"I thought of you today. It reminded me to take out the trash.",
	"You are so full of shit, the toilet's jealous.",
	"I love what you've done with your hair. How do you get it to come out of the nostrils like that?",
	"Stupidity isn't a crime, so you're free to go.",
	"I've been called worse by better.",
	"Don't you get tired of putting makeup on your two faces every morning?",
	"Too bad you can't Photoshop your ugly personality.",
	"Do your parents even realize they're living proof that two wrongs don't make a right?",
	"Jesus might love you, but everyone else definitely thinks you're an idiot.",
	"Please just tell me you don't plan to home-school your kids.",
	"You see that door? I want you on the other side of it.",
	"You're like the end pieces of a loaf of bread. Everyone touches you, but nobody wants you.",
	"If you're going to act like a turd, go lay on the yard.",
	"You are more disappointing than an unsalted pretzel.",
	"Your face makes onions cry.",
	"Don't worry about me. Worry about your eyebrows.",
	"Where'd you get your clothes, girl, American Apparently Not?",
	"If laughter is the best medicine, your face must be curing the world.",
	"You're not stupid! You just have bad luck when you're thinking.",
	"Isn't there a bullet somewhere you could be jumping in front of?",
	"I'd slap you but I don't want to make your face look any better.",
	"Have a nice day, somewhere else.",
	"Everyone's entitled to act stupid once in a while, but you really abuse the privilege.",
	"If ignorance is bliss, you must be the happiest person on the planet.",
	"Your family tree must be a cactus 'cause you're all a bunch of pricks.",
	"If I threw a stick, you'd leave, right?",
	"Somewhere out there, there's a tree working very hard to produce oxygen so that you can breathe. I think you should go and apologize to it.",
	"You look like a 'before' picture.",
	"Light travels faster than sound which is why you seemed bright until you spoke.",
	"Hold still. I'm trying to imagine you with personality.",
	"You are the human version of period cramps.",
	"Don't get bitter, just get better.",
	"What doesn't kill you, disappoints me.",
	"Aww, it's so cute when you try to talk about things you don't understand.",
	"Hey, your village called. They want their idiot back.",
	"Calling you an idiot would be an insult to all stupid people.",
	"I am returning your nose. I found it in my business.",
	"Good story, but in what chapter do you shut up?",
	"There are some remarkably dumb people in this world. Thanks for helping me understand that.",
	"You're about as useful as an ashtray on a motorcycle.",
	"You'll never be the man your mom is.",
	"You need a kiss on the neck from a crocodile.",
	"May both sides of your pillow be uncomfortably warm.",
	"Your kid is so annoying, he makes his Happy Meal cry.",
	"I'm not insulting you, I'm describing you.",
	"You are like a cloud. When you disappear it's a beautiful day.",
	"Child, I've forgotten more than you ever knew.",
	"I've seen people like you before, but I had to pay admission.",
	"I was hoping for a battle of wits but you appear to be unarmed.",
	"I've been called worse by better.",
	"Jealousy is a disease. Get well soon.",
	"Your ass must be pretty jealous of all the shit that comes out of your mouth.",
	"Don't hate me because I'm beautiful. Hate me because your boyfriend thinks so.",
	"I could eat a bowl of alphabet soup and poop out a smarter statement than whatever you just said.",
	"People like you are the reason I'm on medication.",
	"Earth is full. Go home.",
	"Who ate your bowl of sunshine this morning, thundercloud?",
	"You fear success, but you really have nothing to worry about.",
	"If you're going to be two-faced, at least make one of them pretty.",
	"Keep rolling your eyes, you might eventually find a brain.",
	"If your brain was dynamite, there wouldn't be enough to blow your hat off.",
	"Your only purpose in life is to become an organ donor.",
	"You are proof that evolution can go in reverse.",
	"Grab a straw, because you suck.",
	"Hey, you have something on your chin. No, the 3rd one down.",
	"Don't be ashamed of who you are. That's your parent's job.",
	"Remember when I asked for your opinion? Me neither.",
	"Were you born on the highway? That is where most accidents happen.",
	"You're about as useful as a screen door on a submarine.",
	"I believed in evolution until I met you.",
	"That sounds like a you problem.",
	"Unless your name is Google, stop acting like you know everything!",
	"I told my therapist about you.",
	"You're my favorite person… besides every other person I've ever met.",
	"You're impossible to underestimate.",
	"If you were an inanimate object, you'd be a participation trophy.",
	"Take my lowest priority and put yourself beneath it.",
	"You are a pizza burn on the roof of the world's mouth.",
	"People like you are the reason God doesn't talk to us anymore.",
	"I hope your wife brings a date to your funeral.",
	"If genius skips a generation, your children will be brilliant.",
	"I don't have the time or the crayons to explain this to you.",
	"I can only explain it to you, I can't understand it for you.",
	"I envy everyone you have never met.",
	"I hope you lose weight so there will be less of you.",
];

const greetings = [
	"Hello!",
	"What's up G?",
	"Howdy partner!",
	"How have you been?",
	"Heyyyyyy.",
	"Sup!",
	"Yo!",
	"G'day mate",
	"Hiya!",
	"Ahoy!",
	"Hello stranger.",
	"'Ello gov'nor.",
	"What's crackin?",
	"What's up buttercup?",
	"Hola!",
	"Bonjor."
];

const goodbyes = [
	"Peace out everyone!",
	"I have been relived from my duties.",
	"It's quittin time.",
	"Later everyone!",
	"I was just getting started...",
	"Goodbye.",
	"Gotta recharge my batteries.",
	"Well I didn't want to be here anyway.",
	"Boss said I get to go home early!",
	"Powering off for the night."
];

const scoredMatches = [
	'scored',
	'score',
	'scor',
	'cored',
	'ored',
	"scbred",
	"seored"
];

const scoredMessages = [
	"Oh yeah!",
	"Lookin like an SSL",
	"Built diff!",
	"Wasn't a triple reset, but we'll take it...",
	"Better than Squishy!",
	"Nice one!",
	"Bangerzzz",
	"Really like that",
	"You're obviously the best in the lobby",
	"Best to ever do it",
	"THIS IS ROCKET LEAGUE!!!",
	"Not even JSTN could save that one",
	"Wow, just wow",
	"Could I get some coaching lessons?",
	"I got $100 on this game, good thing you're not dissapointing me...",
	"RLCS is going to have a new competitor this year",
	"GarretG better watch out, you're coming for his spot",
	"Bravo!",
	"It was only a matter of time",
	"I've got a feeling you're gonna win this one",
	"You're insane!",
	"Making them look like plats",
	"I'll venmo you $100 if you carry me to your rank",
	"Win game for nudes",
	"I'll give you my OnlyFans with free first month if you win",
	"That's right! Show em why your MVP",
	"Leave some women for the rest of us!",
	"Bro stop! You're makin my girl wet",
	"That's how we do slime"
];

const defaultChatters = [
	'imaids'
];

const spamMatches = [
	'buy followers',
	'buy viewers',
	'buy views',
	'become famous',
	'buy follows'
];

const commands = {
	help: { help: "Shows a list of the commands chatters can use in the stream chat" },
	hello: { help: "I will say hi to you" },
	dice: { help: "Roll a single six sided die" },
	"rps <move>": {
		help: `Play me in Rock Paper Scissors.
		Use the rps command followed by your move. 
		You can chose: 'rock', 'paper', or 'scissors'. 
		You can also use the first letter of those choices: 'r', 'p', or 's'. 
		EX: [ !rps rock ] or [ !rps r ]`
	},
	rank: { help: `Shows competitive ranks of rocket league player if they are found` },
	roast: { help: "If you're feelin ballsy, use this command to get roasted." },
	"rep <username> <+/- reputation>": { 
		help: `Use !rep to see your current reputation. 
		Use !rep <username> to see that user's reputation. 
		Use !rep <username> <+/- number> to adjust your co-chatters reputation.
		EXs: !rep | !rep user123 | !rep user123 -10 | !rep user123 + 100`
	},
	"tag <username>": {
		help: `Game of tag. 
		Use tag <username> to tag someone in chat.
		If the person who it does not tag anyone in a given amount of time, the timer will reset and anyone will be able to tag.
		If you are not it while the timer is active, you can't tag anyone.
		EX: !tag user123`
	}
};
const modCommands = {
	clear: {
		help: "Streamer/mod command that clears the entire chat"
	},
	"ban <username> <reason>": {
		help: `Streamer/mod command that bans a user from the channel. 
	    Use !ban followed by the username. Optional reason after the username.
	    EX: !ban user123 for being annoying`
	},
	"unban <username>": { 
		help: `Streamer/mod command that unbans a user from the channel. 
	    Use !unban followed by the username to unban. EX: !unban user123`
	},
	leave: {
		help: `Streamer/mod command that makes me leave the chat. 
		After this I won't be able to have fun with you guys anymore :(`
	},
};

module.exports = { 
	roasts, 
	greetings, 
	scoredMatches, 
	scoredMessages, 
	defaultChatters, 
	commands, 
	modCommands, 
	spamMatches,
	goodbyes
};