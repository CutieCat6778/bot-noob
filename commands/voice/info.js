const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "voiceinfo",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['vcinfo', 'vcthongtin'],
        category: "voice",
        usage: []
    },
    async execute(client, message, args, guildCache) {
        try{
            const voice = client.voices.get(message.member.voice.channel.id);
            if(voice){
                const mutedUsers = message.member.voice.channel.members.filter(a => a.voice.mute == true).map(a => a.user.id);
                const defUsers = message.member.voice.channel.members.filter(a => a.voice.deaf == true).map(a => a.user.id);
                const embed = new MessageEmbed()    
                    .setColor("#ea8c55")
                    .setTitle(message.member.voice.channel.name)
                    .addFields([
                        {"name": "Chủ phòng", "value": message.guild.members.cache.get(voice.owner) ? `<@${message.guild.members.cache.get(voice.owner).id}>` : "trống", "inline": true},
                        {"name": "Tần số", "value": message.member.voice.channel.bitrate / 1000+"", "inline": true},
                        {"name": "Tắt mic", "value": mutedUsers && mutedUsers.length > 0 ? mutedUsers.map(a => message.guild.members.cache.get(a)).join('\n') : 'không có', "inline": true},
                        {"name": "Block", "value": voice.deny.length > 0 ? voice.deny.map(a => message.guild.members.cache.get(a)).join('\n') : 'không có', "inline": true},
                        {"name": "Cho phép", "value": voice.allow.length > 0 ? voice.map(a => message.guild.members.cache.get(a.id) && console.log(a)).join('\n') : "không có", "inline": true},
                        {"name": "Tắt loa", "value": defUsers && defUsers.length > 0 ? defUsers.map(a => message.guild.members.cache.get(a)).join('\n') : 'không có', "inline": true},
                    ])
                    .setTimestamp(message.member.voice.channel.createdAt)
                    .setFooter('Phòng được tạo lúc')
                return message.reply({embeds: [embed]});
            }else if(!voice) return message.channel.send('Bạn cần phải ở trong một Voice nào đó!');
        }catch(e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
} 