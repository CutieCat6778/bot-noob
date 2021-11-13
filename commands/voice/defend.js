module.exports = {
    config: {
        name: "vcdefend",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['vcdef', 'vcd', 'vctatloa'],
        category: "voice",
        usage: ['[number]']
    },
    async execute(client, message, args, guildCache) {
        try{
            const voice = client.voices.get(message.member.voice.channel.id);
            if(voice && voice.owner == message.member.id){
                const user = require('mention-converter')(args[0]);
                if(user){
                    const userVoice = message.member.voice.channel.members.get(user);
                    if(userVoice){
                        userVoice.voice.setDeaf(!userVoice.voice.deaf);
                        return message.react('<:hmmmmm:770520614444335104>');
                    }else return message.react('❌');
                }
            }else if(!voice) return message.react('❌');
        }catch(e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
} 