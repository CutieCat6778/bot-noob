module.exports = {
    config: {
        name: "vcunlock",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['voiceunlock', 'vcmokhoa', 'vcopen'],
        category: "voice",
        usage: []
    },
    async execute(client, message, args, guildCache) {
        try {
            const voice = client.voices.get(message.member.voice.channel.id);
            if (voice && voice.owner == message.member.id) {
                await message.member.voice.channel.permissionOverwrites.set([{
                    id: "721203266452586507",
                    allow: [Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK]
                }]);
                voice.lock = false;
                return message.react('<:hmmmmm:770520614444335104>');
            } else if (!voice) return message.react('❌')
        } catch (e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
} 