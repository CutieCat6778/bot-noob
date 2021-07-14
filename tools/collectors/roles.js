module.exports = async (client) => {
    try {
        const message = await client.channels.cache.get('802254125970358273').messages.fetch('831938780193751111')
        if (!message) return new Error('No message found!');
        if (message) {
            await message.reactions.removeAll();
            await message.react("⚪");
            await message.react("🔵")
            const filter = (reaction, user) => {
                return reaction.emoji.name == "🔵" || reaction.emoji.name == "⚪";
            };
            const collector = await message.createReactionCollector(filter);
            collector.on('collect', (reaction, userData) => {
                if (reaction.emoji.name == "🔵") {
                    const guild = client.guilds.cache.get('721203266452586507')
                    const role = guild.roles.cache.get('763149761225687060');
                    const user = guild.members.cache.get(userData.id);
                    if(user.roles.cache.has('766059605519892491')) return;
                    if (!user.roles.cache.has(role.id)) {
                        user.roles.add(role);
                    } else if (user.roles.cache.has(role.id)) return;
                }
                if (reaction.emoji.name == "⚪") {
                    const guild = client.guilds.cache.get('721203266452586507')
                    const role = guild.roles.cache.get('766059605519892491');
                    const user = guild.members.cache.get(userData.id);
                    if(user.roles.cache.has('763149761225687060')) return;
                    if (!user.roles.cache.has(role.id)) {
                        user.roles.add(role);
                    } else if (user.roles.cache.has(role.id)) return
                }
            });

            collector.on('end', collected => {
                client.users.cache.get('762749432658788384').send('Collector stoped');
                require('./roles')(client);
            });
        }
    } catch (e) {
        return require('../functions/error')(e)
    }
}