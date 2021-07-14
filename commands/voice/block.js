module.exports = {
    config: {
        name: "vcblock",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['vcdeny'],
        category: "voice",
        usage: ['[@user]']
    },
    async execute(client, message, args, guildCache) {
        try{
            const voice = client.voices.get(message.member.voice.channelID);
            if (voice && voice.owner == message.member.id) {
                const user = require('mention-converter')(args[0]);
                if(user){
                    await message.member.voice.channel.updateOverwrite(user, {
                        CONNECT: false,
                        SPEAK: false
                    });
                    voice.deny.push(user);
                    voice.allow.includes(user) ? voice.allow.splice(voice.allow.indexOf(user), 1) : null;
                    return message.react('<:hmmmmm:770520614444335104>');
                }else return message.react('❌')
            } else if (!voice) return message.react('❌')
        }catch(e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
}