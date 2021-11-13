const { Permissions } = require("discord.js");

module.exports = {
    config: {
        name: "vcallow",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['vcunblock', 'vcchophep'],
        category: "voice",
        usage: ['[@user]']
    },
    async execute(client, message, args, guildCache) {
        try{
            const voice = client.voices.get(message.member.voice.channel.id);
            if (voice && voice.owner == message.member.id) {
                const user = require('mention-converter')(args[0]);
                if(user){
                    message.react('👀');
                    const permissionOverwrites = message.member.voice.channel.permissionOverwrites;
                    await permissionOverwrites.edit(user, {
                        CONNECT: true,
                    })
                    voice.allow.push(user);
                    voice.deny.includes(user) ? voice.deny.splice(voice.deny.indexOf(user), 1) : null;
                    return message.react('<:hmmmmm:770520614444335104>');
                }else return message.react('❌')
            } else if (!voice) return message.react('❌')
        }catch(e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
} 