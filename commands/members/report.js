module.exports = {
    config: {
        name: "report",
        aliases: ["baocao"],
        usage: ["@user"],
        category: "memebrs",
        description: "Report một ai đó, vì một hành vi trái phép!",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"],
    },
    async execute(client, message, args, guild) {
        try{
            if(!args[0]){
                return message.channel.send("Hãy chỉ ra người mà bạn muốn report (báo cáo)!");
            }
            if(!args[1]){
                return message.channel.send('Hãy chỉ ra lý do mà bạn muốn báo cáo người ấy!');
            }
            const user = message.guild.members.cache.get(require('mention-converter')(args[0]));
            if(!user) return message.channel.send("Không tìm thấy người dùng!");
            const reason = args.slice(1).join(' ');
            if(reason.length < 12) return message.channel.send('Hãy chỉ ra lý do cụ thể hơn. Phải hơn 12 ký tự!');
            const embed = {
                color: "#ea8c55",
                title: `Nhận được report về người dùng ${user.user.tag}`,
                description: `[Nhảy đến đó](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}/)\n\n**Người báo cáo**: **${message.author.tag}**\`(${message.author.id})\`\n**Ở channel**: **\`${message.channel.name}\`**\n\n**Lý do**\n${reason}`,
                timestamp: new Date(),
                footer: {
                    text: "Bản báo về người dùng",
                    icon_url: message.guild.iconURL()
                }
            }
            const channel = message.guild.channels.cache.get('764029472701022229');
            channel.send({embeds: [embed]});
            return message.channel.send('Đã gửi bản báo cáo cho các cán bộ, họ sẽ sớm tham gia vào cuộc để điều tra!');
        }catch(e){
            return require("../../tools/functions/error")(e, message)
        }
    }
}