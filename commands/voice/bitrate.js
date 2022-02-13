module.exports = {
    config: {
        name: "vcbitrate",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['vctanso'],
        category: "voice",
        usage: ['[bitrate(16-128)]']
    },
    async execute(client, message, args, guildCache) {
        try{
            const voice = client.voices.get(message.member.voice.channel.id);
            if(voice && voice.owner == message.member.id){
                if(args[0] || parseInt(args[0]) || !isNaN(args[0])){
                    const bitrate = parseInt(args[0]) * 1000;
                    if(bitrate >= 128 && bitrate <= 16) return message.react('❌');
                    await message.member.voice.channel.setBitrate(bitrate);
                    return message.react('<:hmmmmm:770520614444335104>');
                }else return message.reply('Bạn không phải là chủ phòng!');
            }else if(!voice) return message.react('❌');
        }catch(e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
} 