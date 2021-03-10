const { Client, Collection } = require('discord.js');
const client = new Client();
require('dotenv').config();

//All Importain Cache stuffs
client.commands = new Collection();
client.aliases = new Collection();
client.timeouts = new Map();
client.ticket = new Map();
client.afk = new Map();
client.snipe = new Map();
client.starboard = new Collection();
client.economy = new Collection();
client.pic = new Collection();

//All variable that we need to store in Client
client.startup = new Date().getTime();
client.total = new Number("0");
client.guild = new Object();

//Command handler
async function handling() {
    await require('./handlers/commands.js')(client);
    await require('./handlers/events.js')(client);
}
handling().then(() => {
    //Login to the bot
    client.login(process.env.token);
})

