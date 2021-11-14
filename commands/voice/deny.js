const { Permissions } = require('discord.js');

module.exports = {
    config: {
        name: "vcblock",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['vcdeny', 'vcban', 'vccam'],
        category: "voice",
        usage: ['[@user]']
    },
    async execute(client, message, args, guildCache) {
        try{
            const voice = client.voices.get(message.member.voice.channel.id);
            if (voice) {
                if(voice.owner != message.member.id) return message.reply('Bạn không phải là chủ phòng!');
                const user = require('mention-converter')(args[0]);
                if(user){
                    message.react('👀');
                    const permissionOverwrites = message.member.voice.channel.permissionOverwrites;
                    await permissionOverwrites.edit(user, {
                        CONNECT: false,
                    })
                    if(message.member.voice.channel.members.get(user)){
                        const userVoice = message.member.voice.channel.members.get(user)
                        userVoice.voice.disconnect();
                    }
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