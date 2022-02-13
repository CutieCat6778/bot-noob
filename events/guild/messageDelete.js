module.exports = async (client, message) => {
    try {
        if (message.author.bot) return;
        const data = await require('../../tools/database/getLevel')(message.author.id);
        if (data) {
            data.messages.deleted.splice(0, 1);
            data.messages.deleted.push(new Date().getTime());
            const addExp = Math.floor(Math.random() * 4) + 4;
            data.exp != 0 ? data.exp -= addExp : (data.level -= 1, data.exp = data.level * 400 - addExp);
            data.total--;
            if (new Date(data.updates[(data.updates.length) - 1]).getDate() != new Date().getDate()) data.updates.push(new Date().getTime());
            await data.save();
        }
        let channel = client.snipe.get(message.channel.id);
        if (!channel) {
            client.snipe.set(message.channel.id, []);
            channel = client.snipe.get(message.channel.id);
        }
        const obj = {
            content: message.content.toString(),
            author: message.author.id,
            time: client.uptime,
            attachments: message.attachments.size > 0 ? message.attachments.map(a => a.url) : null,
            embeds: message.embeds.length > 0 ? message.embeds[0] : null
        }
        if (channel.length <= 10) {
            channel.push(obj);
        }
        if (channel.length > 10) {
            const shift = channel.shift();
        }
    } catch (e) {
        return require('../../tools/functions/error')(e, message);
    }
}