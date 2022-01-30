require('dotenv').config();
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MEMBERS, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    partials: ["REACTION", "MESSAGE"]
});

//All Importain Cache stuffs
client.commands = new Collection();
client.aliases = new Collection();
client.starboard = new Collection();
client.voices = new Collection();
client.timeouts = new Map();
client.ticket = new Map();
client.afk = new Map();
client.snipe = new Map();
client.edits = new Map();
client.pic = new Map();
client.invites = new Map();
client.voiceStats = new Map();

//All variable that we need to store in Client
client.startup = new Date().getTime();
client.total = new Number("0");
client.guild = new Object();
client.noImage = new Array();
client.thinh = new Date().getTime();
client.thinhUsed = new Array();
client.thinhUsedEn = new Array();
client.whitelistChannels = new Array("937435861182722098", "931007026300059698", "906603913678061579", "933054973401526375", "933056338701979698", "933033236848853053", "936922754047967233");

(async() => {
    await require('./handlers/commands.js')(client);
    await require('./handlers/events.js')(client);
})().then(() => {
    client.login(process.env.token);
})
