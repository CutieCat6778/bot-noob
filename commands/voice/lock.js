const { Permissions } = require("discord.js");

module.exports = {
    config: {
        name: "vclock",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['voicelock', 'vckhoa', 'vcdong'],
        category: "voice",
        usage: []
    },
    async execute(client, message, args, guildCache) {
        try {
            const voice = client.voices.get(message.member.voice.channel.id);
            if (voice) {
                if(voice.owner != message.member.id) return message.reply('Bạn không phải là chủ phòng!');
                const permissionOverwrites = message.member.voice.channel.permissionOverwrites;
                await permissionOverwrites.edit("721203266452586507", {
                    CONNECT: false
                })
                await permissionOverwrites.edit("798520252446408744", {
                    CONNECT: true,
                    SPEAK: true,
                })
                voice.lock = true;
                return message.react('<:hmmmmm:770520614444335104>');
            } else if (!voice) return message.react('❌')
        } catch (e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
} 