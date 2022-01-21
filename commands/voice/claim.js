module.exports = {
    config: {
        name: "vcclaim",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['vcgetowner', 'vcowner', 'vclayquyen'],
        category: "voice",
        usage: []
    },
    async execute(client, message, args, guildCache) {
        try{
            const voice = client.voices.get(message.member.voice.channel.id);
            if(voice && voice.owner == null){
                voice.owner = message.member.id;
                return message.react('<:hmmmmm:770520614444335104>');
            }else if(voice && voice.owner == message.member.id) return message.react('<:hmmmmm:770520614444335104>');
            else return message.react('❌');
        }catch(e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
} 