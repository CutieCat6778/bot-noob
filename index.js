const { Client, Collection } = require('discord.js');
const client = new Client();
require('dotenv').config();

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

//All variable that we need to store in Client
client.startup = new Date().getTime();
client.total = new Number("0");
client.guild = new Object();
client.noImage = new Array();
client.thinh = new Date().getTime();
client.thinhUsed = new Array();

(async() => {
    await require('./handlers/commands.js')(client);
    await require('./handlers/events.js')(client);
})().then(() => {
    client.login(process.env.token);
})