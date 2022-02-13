const newStarboard = require("../../tools/database/newStarboard");
const getStarboard = require("../../tools/database/getStarboard");
const removeStarboard = require("../../tools/database/removeStarboard");

module.exports = async (client, reaction, user) => {
    try {
        if (reaction.emoji.name == "⭐") {
            if (user.bot) return;
            let message = reaction.message;
            const data = await getStarboard(message.id);
            const guild = await client.guilds.fetch('721203266452586507')
            const channel = await guild.channels.fetch('787342196734296084');
            const currChannel = await guild.channels.fetch(message.channelId);
            if (!message.author) message = await currChannel.messages.fetch(message.id);
            const reactions = message.reactions.cache.find(a => a.emoji.name === "⭐");
            if(!reactions) return;
            const userData = message.guild.members.cache.get(user.id);
            const embed = {
                "description": `**${reactions.users.cache.size}** ⭐ <#${message.channel.id}> ➜ [Ấn vào đây](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}/)\n\n${message.content.toString()}`,
                "color": "#fdd03b",
                "author": {
                    "name": `${userData.user.tag}`,
                    "icon_url": userData.user.displayAvatarURL()
                },
                "timestamp": message.createdAt
            }
            message.attachments.first() ? embed.image = { url: message.attachments.first().url } : null;
            if (reactions.users.cache.size == 2 && !data) {
                const msg = await channel.send({ embeds: [embed] })
                newStarboard({
                    _id: message.id,
                    embedId: msg.id
                })
                msg.react('⭐');
            } else if (reactions.users.cache.size >= 2 && data) {
                const msg = await channel.messages.fetch(data.embedId);
                if(!msg) return removeStarboard(message.id);
                await msg.edit({ embed: embed });
            } else return;
        }
    } catch (e) {
        client.error(e);
    }
}