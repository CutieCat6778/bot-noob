module.exports = {
    config: {
        name: "bitrate",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['tanso'],
        category: "voice",
        usage: ['[Bit_rate]']
    },
    async execute(client, message, args, guildCache) {
        try{
            const voice = client.voices.get(message.member.voice.channel.id);
            if(voice && voice.owner == message.member.id){
                if(args[0] || parseInt(args[0]) || !isNaN(args[0])){
                    const bitrate = parseInt(args[0]) * 1000;
                    if(bitrate > 128 || bitrate < 16) return message.react('❌');
                    await message.member.voice.channel.setBitrate(bitrate);
                    return message.react('<:hmmmmm:770520614444335104>');
                }else return message.react('❌');
            }else if(!voice) return message.react('❌');
        }catch(e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
} 