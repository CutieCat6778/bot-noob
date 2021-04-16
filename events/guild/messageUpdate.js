module.exports = (client, oldMessage, newMessage) => {
    try {
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
        if (channel.length <= 2) {
            channel.push(obj);
        }else if (channel.length > 2) {
            const shift = channel.shift();
            channel.push(obj);
        }
    } catch (e) {
        return require('../../tools/functions/error')(e, newMessage);
    }
}