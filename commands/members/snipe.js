const MessageEmbed = require("../../classes/newEmbed");

module.exports = {
    config: {
        name: "snipe",
        aliases: ["delmsg", "deletemsg"],
        category: "members",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            let snipe = client.snipe.get(message.channel.id);
            if (!snipe) return message.channel.send("Không có tin nhắn nào đc xóa gần đây !");
            let user = message.guild.members.cache.get(snipe.id);
            if (!user) return message.channel.send("Không tìm thấy tác giả!");
            else if (snipe) {
                if(snipe.embed){
                    message.channel.send("Đã tìm thấý một cái embed");
                    return message.channel.send({embed: snipe.embed})
                }
                let embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setAuthor(`${user.displayName}`, user.user.displayAvatarURL())
                    .setDescription(`   ${snipe.content}`)
                    .setFooter(require("ms")((new Date() - snipe.time), { long: true }) + " ago")
                return require('../../tools/function/sendMessage')(message, embed);
            } else {
                return;
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }
    }
}