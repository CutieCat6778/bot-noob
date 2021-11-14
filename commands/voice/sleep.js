const { Permissions } = require('discord.js');

module.exports = {
    config: {
        name: "vcsleep",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['voicesleep', 'vcngu', 'vcmuteall'],
        category: "voice",
        usage: []
    },
    async execute(client, message, args, guildCache) {
        try {
            const voice = client.voices.get(message.member.voice.channel.id);
            if (voice) {
                if(voice.owner != message.member.id) return message.reply('Bạn không phải là chủ phòng!');
                message.react('👀');
                const permissionOverwrites = message.member.voice.channel.permissionOverwrites;
                await permissionOverwrites.edit("798520252446408744", {
                    SPEAK: true,
                    USE_VAD: true
                })
                await permissionOverwrites.edit("721203266452586507", {
                    SPEAK: false,
                    USE_VAD: false
                })
                client.sleep = true;
                return message.react('<:hmmmmm:770520614444335104>');
            } else if (!voice) return message.react('❌')
        } catch (e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
} 