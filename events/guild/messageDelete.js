module.exports = (client, message) => {
    try{
        client.snipe.set(message.channel.id, {
            content: message.content,
            id: message.author.id,
            time: new Date(),
            embed: message.embeds.length > 0 ? message.embeds[0] : null
        });
        console.log(client.snipe)
    }catch(e){
        return require('../../tools/functions/error')(e, message);
    }
}