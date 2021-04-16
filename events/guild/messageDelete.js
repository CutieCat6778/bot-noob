module.exports = (client, message) => {
    try {
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
        if (channel.length <= 2) {
            channel.push(obj);
        }else if (channel.length > 2) {
            const shift = channel.shift();
            channel.push(obj);
        }
    } catch (e) {
        return require('../../tools/functions/error')(e, message);
    }
}