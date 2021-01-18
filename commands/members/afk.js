module.exports = {
    config: {
        name: 'afk',
        aliases: ["notonline", "offline"],
        category: "members",
        perms: ["SEND_MESSAGES"],
        description: "You use this command to tell people that you are offline",
        bot: ["SEND_MESSAGES"]
    },
    async execute (client, message, args, guild) {
        try{
            if(!args[0]) {
                return message.channel.send('Hãy đễ lại một lời nhắn.')
            }else if(args[0]){
                let status = args.slice(0).join(" ");
                const obj = {
                    status: status,
                    enable: false,
                    time: client.uptime,
                    name: false,
                }
                if(message.member.manageable){
                    await message.member.setNickname(`[AFK] ${message.member.displayName}`);
                    obj.name = true;
                }
                client.afk.set(message.author.id, obj)
                message.reply("đã chuyển bạn vào trạng thái AFK");
                client.setTimeout(() => {
                    return client.afk.get(message.author.id).enable = true;
                }, 15000);
            }else return;
        }catch (e) {
            return require("../../tools/error")(e, message)
        }
        
    }
}