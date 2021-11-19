module.exports = async (client, oldMessage, newMessage) => {
    try {
        const data = await require('../../tools/database/getLevel')(newMessage.author.id);
        if (data) {
            data.messages.updated.push(newMessage.createdAt);
            if (message.content.startsWith('http')) {
                data.messages.link.push(newMessage.createdAt);
            }
            if (message.content.startsWith('.')) {
                data.messages.bot.push(newMessage.createdAt);
            }
            if (message.stickers.size > 0) {
                data.messages.stickers.push(newMessage.createdAt);
            }
            if(message.content.includes('<:') && message.content.includes(":>")){
                data.messages.emojis.push(message.createdAt);
            }
            if (message.mentions?.member?.size > 0) {
                const data = [];
                message.mentions.members.forEach(async member => {
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
            const channelData = data.channel.find(a => a._id == newMessage.channel.id);
            if (channelData) {
                channelData.times.push(newMessage.createdAt);
            } else {
                data.channels.push({
                    _id: newMessage.channel.id,
                    times: [newMessage.createdAt]
                })
            }
            const addExp = Math.floor(Math.random() * 4) + 4;
            data.exp += addExp;
            data.total++;
            if ((data.exp >= data.level * 400 && data.level > 0) || (data.exp > 400 && data.level == 0)) {
                data.level++;
                data.exp = 0;
                const channel = newMessage.guild.channels.cache.get('801567245351780433');
                channel.send(`GG ${newMessage.member}\nGà vậy mà vẫn lên level **${data.level}** 😏`);
            }
            data.updates.push(newMessage.createdAt);
            await data.save();
        }
        const blocklistdomains = require('../../asset/blocklist/domains.json');
        if (newMessage.content.includes('.') && newMessage.content.includes('http')) {
            let block = false;
            for (let domain of blocklistdomains) {
                if (newMessage.content.includes(domain)) {
                    block = true;
                }
            }
            if (block == false) {
                newMessage.delete();
                let m = await newMessage.channel.send('**đường link này đã bị chặn!!!**')//.then(m => setTimeout(() => {m.delete()}), 7000)
                setTimeout(() => {
                    m.delete()
                }, 7000)
                const channel = newMessage.guild.channels.cache.get('813765397353725962');
                channel.send({ embeds: [{ title: "Đã chặn được một tên miền!", description: `${newMessage.author.id} | ${newMessage.author.tag}\n\n${newMessage.content.split('://').join('[://]').split('.').join('[.]')}` }] });
            }
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