const { Permissions } = require('discord.js');

module.exports = {
    config: {
        name: "vcdc",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['vclv', 'vcdelete', 'vcleave'],
        category: "voice",
        usage: ['[@user]']
    },
    async execute(client, message, args, guildCache) {
        try{
            const voice = client.voices.get(message.member.voice.channel.id);
            if (voice) {
                if(voice.owner != message.member.id) return message.reply('Bạn không phải là chủ phòng!');
                message.member.voice.channel.delete();
                return message.react('<:hmmmmm:770520614444335104>')
            } else if (!voice) return message.react('❌')
        }catch(e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
} 
