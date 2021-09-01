
const MessageEmbed = require("../../classes/newEmbed")

module.exports = {
    config: {
        name: "avatar",
        aliases: ["av", "ava"],
        category: "infomations",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"],
        usage: ['@user']
    },
    async execute (client, message, args) {
        try {
            let user;
            if (!args[0]) user = message.member;
            if(args[0]){
                user = message.guild.members.cache.get(require('mention-converter')(args[0]));
                if(!user) return message.channel.send("Member not found");
            }
            let embed = new MessageEmbed()
                .setTitle(`${user.displayName}'s avatar`)
                .setDescription(`[Click here for link](${user.user.displayAvatarURL({ size: 256, format: "png" })})`)
                .setImage(user.user.displayAvatarURL({ size: 512 }))
                .setTimestamp()
            message.channel.send({embeds: [embed]});
        }catch (e) {
            return require("../../tools/functions/error")(e, message)
        }
    }
}