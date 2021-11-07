require('dotenv').config();
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MEMBERS, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }   
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
client.voiceexp = new Map();

//All variable that we need to store in Client
client.startup = new Date().getTime();
client.total = new Number("0");
client.guild = new Object();
client.noImage = new Array();
client.thinh = new Date().getTime();
client.thinhUsed = new Array();
client.thinhUsedEn = new Array();

(async() => {
    await require('./handlers/commands.js')(client);
    await require('./handlers/events.js')(client);
})().then(() => {
    client.login(process.env.token);
})
