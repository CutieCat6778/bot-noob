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
            if (voice && voice.owner == message.member.id) {
                await message.member.voice.channel.permissionOverwrites.set([{
                    id: "798520252446408744",
                    deny: [ Permissions.FLAGS.SPEAK, Permissions.FLAGS.USE_VAD]
                }]);
                await message.member.voice.channel.permissionOverwrites.set([{
                    id: "798520252446408744",
                    allow: [Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK, Permissions.FLAGS.USE_VAD]
                }]);
                voice.sleep = true;
                return message.react('<:hmmmmm:770520614444335104>');
            } else if (!voice) return message.react('❌')
        } catch (e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
} 