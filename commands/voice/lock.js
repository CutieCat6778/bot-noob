module.exports = {
    config: {
        name: "vclock",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['voicelock'],
        category: "voice"
    },
    async execute(client, message, args, guildCache) {
        try {
            const voice = client.voices.get(message.member.voice.channelID);
            if (voice && voice.owner == message.member.id) {
                await message.member.voice.channel.updateOverwrite("721203266452586507", {
                    CONNECT: false,
                    SPEAK: false
                });
                voice.status = "lock";
                return message.react('<:hmmmmm:770520614444335104>');
            } else if (!voice) return message.react('❌')
        } catch (e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
}