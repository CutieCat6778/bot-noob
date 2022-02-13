const newStarboard = require("../../tools/database/newStarboard");
const getStarboard = require("../../tools/database/getStarboard");

module.exports = async (client, reaction, user) => {
    try {
        if (reaction.emoji.name == "⭐") {
            if (user.bot) return;
            let message = reaction.message;
            const data = await getStarboard(message.id);
            const guild = await client.guilds.fetch('721203266452586507')
            const channel = await guild.channels.fetch('787342196734296084');
            const currChannel = await guild.channels.fetch(message.channelId);
            const reactions = message.reactions.cache.find(a => a.emoji.name === "⭐");
            if (!message.author) message = await currChannel.messages.fetch(message.id);
            const userData = message.guild.members.cache.get(user.id);
            console.log(data, reactions, reactions.users.cache.size)
            const embed = {
                "description": `<#${message.channel.id}> ➜ [Ấn vào đây](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}/)\n\n${message.content.toString()}`,
                "color": "#fdd03b",
                "author": {
                    "name": userData.user.tag,
                    "icon_url": userData.user.displayAvatarURL()
                },
                "footer": {
                    "text": `⭐ ${reactions.users.cache.size + 1}`
                },
                "timestamp": message.createdAt
            }
            message.attachments.first() ? embed.image = { url: message.attachments.first().url } : null;
            if (reactions.users.cache.size + 1 == 1 && !data) {
                const msg = await channel.send({ embeds: [embed] })
                new newStarboard({
                    _id: message.id,
                    embedId: msg.id
                })
                data.msgId = msg.id;
                msg.react('⭐');
            } else if (reactions.users.cache.size + 1 >= 1 && data) {
                const msg = await channel.messages.fetch(data.embedId);
                await msg.edit({ embed: embed });
            } else return;
        }
    } catch (e) {
        client.error(e);
    }
}