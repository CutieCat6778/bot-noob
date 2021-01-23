module.exports = async (client, reaction, user) => {
    if (reaction.emoji.name == "⭐") {
        if(user.bot) return;
        const message = reaction.message;
        const guild = await client.guilds.cache.get('721203266452586507')
        const channel = await guild.channels.cache.get('787342196734296084');
        let data = client.starboard.get(message.id) || client.starboard.find(a => a.msgId == message.id);
        if (!data) {
            const obj = {
                _id: message.id,
                content: message.content,
                timeStamp: (new Date()).getTime(),
                author: user.id,
                upvotes: 0,
                upvoters: []
            }
            message.attachments.first() ? obj.url = message.attachments.first().url : null;
            client.starboard.set(message.id, obj);
            data = client.starboard.get(message.id);
        }
        if(data.upvoters.includes(user.id)) return;
        if(message.embeds){
            data.content = `${message.embeds.title ? message.embeds.title : null}${message.embeds.description && message.embeds.title ? `\n\n${message.embeds.description}` : (message.embeds.description ? message.embed.description : null)}`
        }
        const userData = message.guild.members.cache.get(data.author);
        data.upvotes++;
        data.upvoters.push(user.id);
        const embed = {
            "description": `<#${message.channel.id}> ➜ [Ấn vào đây](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}/)\n\n**${data.content.toString().split("**").join("")}**`,
            "color": "#fdd03b",
            "author": {
                "name": userData.user.tag,
                "icon_url": userData.user.displayAvatarURL()
            },
            "footer": {
                "text": `⭐ ${data.upvotes}`
            },
            "timestamp": data.timeStamp
        }
        data.url ? embed.image = {url: data.url} : null;
        if (data.upvotes == 2) {
            const msg = await channel.send({ embed: embed })
            data.msgId = msg.id;
            msg.react('⭐')
        } else if (data.upvotes >= 2) {
            const msg = await channel.messages.fetch(data.msgId);
            await msg.edit({ embed: embed });
            await msg.reactions.removeAll();
            await msg.react('⭐');
        } else return;
    }
}