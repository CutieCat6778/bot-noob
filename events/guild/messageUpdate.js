module.exports = async (client, oldMessage, newMessage) => {
    try {
        if(newMessage.author.bot) return;
        const data = await require('../../tools/database/getLevel')(newMessage.author.id);
        if (data) {
            data.messages.updated.splice(0, 1);
            data.messages.updated.push(newMessage.createdAt);
            if (newMessage.content.startsWith('http')) {
                data.messages.links.splice(0, 1);
                data.messages.links.push(newMessage.createdAt);
            }
            if (newMessage.content.startsWith('.')) {
                data.messages.bot.splice(0, 1);
                data.messages.bot.push(newMessage.createdAt);
            }
            if (newMessage.stickers.size > 0) {
                data.messages.stickers.splice(0, 1);
                data.messages.stickers.push(newMessage.createdAt);
            }
            if(newMessage.content.includes('<:') && newMessage.content.includes(":>")){
                data.messages.emoji.splice(0, 1);
                data.messages.emojis.push(newMessage.createdAt);
            }
            if (newMessage.mentions?.member?.size > 0) {
                const data = [];
                newMessage.mentions.members.forEach(async member => {
                    const userData = data.message.mentions.find(a => a._id === member.id);
                    if (userData) {
                        userData.times.push(newMessage.createdAt);
                    } else {
                        userData.push({
                            _id: member.id,
                            times: [newMessage.createdAt]
                        })
                    }
                    const userDataCloud = await require('../../tools/database/getLevel')(member.id);
                    if (userDataCloud) userDataCloud.messages.mentionsBy.push(newMessage.createdAt);
                })
            }
            const channelData = data.channels.find(a => a._id == newMessage.channel.id);
            if (channelData) {
                channelData.times.push(newMessage.createdAt);
            } else {
                data.channels.splice(0, 1);
                data.channels.push({
                    _id: newMessage.channel.id,
                    times: [newMessage.createdAt]
                })
            }
            if (data.exp < 0) data.exp = 0;
            if (data.level < 0) data.level = 0;
            if(new Date(data.updates[(data.updates.length) - 1]).getDate() != new Date().getDate()) data.updates.push(newMessage.createdAt);
            await data.updateOne(data, (err, result) => {
                    if(err) throw err;
                })
        }
        let channel = client.edits.get(newMessage.channel.id);
        if (!channel) {
            client.edits.set(newMessage.channel.id, []);
            channel = client.edits.get(newMessage.channel.id);
        }
        const obj = {
            oldContent: oldMessage.content.toString(),
            newContent: newMessage.content.toString(),
            author: newMessage.author.id,
            time: client.uptime,
            attachments: newMessage.attachments.size > 0 ? newMessage.attachments.map(a => a.url) : null,
            embeds: newMessage.embeds.length > 0 ? newMessage.embeds[0] : null
        }
        if (channel.length <= 10) {
            channel.push(obj);
        }
        if (channel.length > 10) {
            const shift = channel.shift();
        }
    } catch (e) {
        return require('../../tools/functions/error')(e, newMessage);
    }
}
