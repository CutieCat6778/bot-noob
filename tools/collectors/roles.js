module.exports = async (client) => {
    try {
        const message = await client.channels.cache.get('802254125970358273').messages.fetch('881563482217132033')
        const message1 = await client.channels.cache.get('802254125970358273').messages.fetch('885210808857034772')
        if (!message) return new Error('No message found!');
        //message.reactions.removeAll();
        //message.react('<:csgo:881559332838314024>')
        message1.react('<:osu:882718173579837473>')
        message1.react('<:bussiness_tour:882718151278751785>')
        //message.react('<:valorant:881560677494444052>')
        //message.react('<:lol:881560939466489876>')
        //message.react('<:pubg:881560572548747365>')
        if(message1){
            const filter = (reaction, user) => {
                return ["882718151278751785", "882718173579837473"].includes(reaction.emoji.id) && user.bot == false;
            };
            const collector = await message1.createReactionCollector(filter);
            collector.on('collect', (reaction, userData) => {
                const guild = client.guilds.cache.get('721203266452586507');
                switch(reaction.emoji.id){
                    // buss
                    case "882718151278751785":
                        let role = guild.roles.cache.get('882716086406103080');
                        let user = guild.members.cache.get(userData.id);
                        if(user.roles.cache.has(role.id)) return user.roles.remove(role.id);
                        user.roles.add(role.id);
                        break;
                    // osu
                    case "882718173579837473":
                        let role2 = guild.roles.cache.get('882716299191517244');
                        let user1 = guild.members.cache.get(userData.id);
                        if(user1.roles.cache.has(role2.id)) return user1.roles.remove(role2.id);
                        user1.roles.add(role2.id);
                        break;
                }
            });

            collector.on('end', collected => {
                client.users.cache.get('762749432658788384').send('Collector stoped');
                require('./roles')(client);
            });
        }
        if (message) {
            const filter = (reaction, user) => {
                return ["881559332838314024", "881560677494444052", "881560939466489876", "881560572548747365", "882718151278751785", "882718173579837473"].includes(reaction.emoji.id) && user.bot == false;
            };
            const collector = await message.createReactionCollector(filter);
            collector.on('collect', (reaction, userData) => {
                const guild = client.guilds.cache.get('721203266452586507');
                switch(reaction.emoji.id){
                    // csgo
                    case "881559332838314024":
                        let role1 = guild.roles.cache.get('881554344779087892');
                        let user1 = guild.members.cache.get(userData.id);
                        if(user1.roles.cache.has(role1.id)) return user1.roles.remove(role1.id);
                        user1.roles.add(role1.id);
                        break;
                    // valorant
                    case "881560677494444052":
                        let role2 = guild.roles.cache.get('881553692749357076');
                        let user2 = guild.members.cache.get(userData.id);
                        if(user2.roles.cache.has(role2.id)) return user2.roles.remove(role2.id);
                        user2.roles.add(role2.id);
                        break;
                    // lol
                    case "881560939466489876":
                        let role3 = guild.roles.cache.get('881553274992492594');
                        let user3 = guild.members.cache.get(userData.id);
                        if(user3.roles.cache.has(role3.id)) return user3.roles.remove(role3.id);
                        user3.roles.add(role3.id);
                        break;
                    // pubg
                    case "881560572548747365":
                        let role = guild.roles.cache.get('828607951366651925');
                        let user = guild.members.cache.get(userData.id);
                        if(user.roles.cache.has(role.id)) return user.roles.remove(role.id);
                        user.roles.add(role.id);
                        break;
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