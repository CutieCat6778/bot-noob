module.exports = async(client) => {
    const message = await client.channels.cache.get('801782840475516978').messages.fetch('801783112790704139')
    if(!message) return new Error('No message found!');
    else if(message){
        const filter = (reaction, user) => {
            return reaction.emoji.name === '🔞' || reaction.emoji.name === '☺️'
        };
        const collector = message.createReactionCollector(filter);
        collector.on('collect', (reaction, userData) => {
            if(reaction.emoji.name == "🔞"){
                const guild = client.guilds.cache.get('721203266452586507')
                const role = guild.roles.cache.get('766059605519892491');
                const user = guild.members.cache.get(userData.id)
                if(!user.roles.cache.has(role.id)){
                    user.roles.add(role);
                }
            }
            if(reaction.emoji.name == "☺️"){
                const guild = client.guilds.cache.get('721203266452586507')
                const role = guild.roles.cache.get('763149761225687060');
                const user = guild.members.cache.get(userData.id)
                if(!user.roles.cache.has(role.id)){
                    user.roles.add(role);
                }
            }
        });

        collector.on('end', collected => {
            client.users.cache.get('762749432658788384').send('Collector stoped');
        });
    }
}