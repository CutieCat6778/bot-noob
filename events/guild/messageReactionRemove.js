const removeStarboard = require("../../tools/database/removeStarboard");
const getStarboard = require("../../tools/database/getStarboard");

module.exports = async (client, reaction, user) => {
    try {
        const guild = client.guilds.cache.get("721203266452586507");
        switch(reaction.emoji.id){
            // buss
            case "882718151278751785":
                let role5 = guild.roles.cache.get('882716086406103080');
                let user5 = guild.members.cache.get(user.id);
                return user5.roles.remove(role5.id);
                break;
            // osu
            case "882718173579837473":
                let role4 = guild.roles.cache.get('882716299191517244');
                let user4 = guild.members.cache.get(user.id);
                return user4.roles.remove(role4.id);
                break;
            // csgo
            case "881559332838314024":
                let role1 = guild.roles.cache.get('881554344779087892');
                let user1 = guild.members.cache.get(user.id);
                return user1.roles.remove(role1.id);
                break;
            // valorant
            case "881560677494444052":
                let role2 = guild.roles.cache.get('881553692749357076');
                let user2 = guild.members.cache.get(user.id);
                return user2.roles.remove(role2.id);
                break;
            // lol
            case "881560939466489876":
                let role3 = guild.roles.cache.get('881553274992492594');
                let user3 = guild.members.cache.get(user.id);
                return user3.roles.remove(role3.id);
                break;
            // pubg
            case "881560572548747365":
                let role6 = guild.roles.cache.get('828607951366651925');
                let user6 = guild.members.cache.get(user.id);
                return user6.roles.remove(role6.id);
                break;
        }
        if (reaction.emoji.name == "⭐") {
            if (user.bot) return;
            let message = reaction.message;
            const data = await getStarboard(message.id);
            if (!data) return;
            const guild = await client.guilds.fetch('721203266452586507')
            const channel = await guild.channels.fetch('787342196734296084');
            const currChannel = await guild.channels.fetch(message.channelId);
            if (!message.author) message = await currChannel.messages.fetch(message.id);
            const reactions = message.reactions.cache.find(a => a.emoji.name === "⭐");
            const userData = message.guild.members.cache.get(user.id);
            const embed = {
                "description": `**${reactions ? reactions.users.cache.size : 0}** ⭐ <#${message.channel.id}> ➜ [Ấn vào đây](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}/)\n\n${message.content.toString()}`,
                "color": "#fdd03b",
                "author": {
                    "name": `${userData.user.tag}`,
                    "icon_url": userData.user.displayAvatarURL()
                },
                "timestamp": message.createdAt
            }
            message.attachments.first() ? embed.image = { url: message.attachments.first().url } : null;
            if (!reactions || reactions.users.cache.size == 0) {
                const msg = await channel.messages.fetch(data.embedId);
                if(!msg) return await removeStarboard(message.id);;
                await msg.delete();
                await removeStarboard(message.id);
            } else if (reactions.users.cache.size >= 2) {
                const msg = await channel.messages.fetch(data.embedId);
                if(!msg) return await removeStarboard(message.id);;
                await msg.edit({ embed: embed });
                await msg.react('⭐');
            }
        }
    } catch (e) {
        client.error(e);
    }
}