const Guild = require('../../models/guild.js');
const defaultGuild = require('../../default.js');

module.exports = async () => {
    let guild = await require('./getGuild')();
    await guild.updateOne({rules: defaultGuild.rules, hook: defaultGuild.hook})
    return guild;
}