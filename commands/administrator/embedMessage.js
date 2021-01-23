module.exports = {
    config: {
        name: "embed",
        aliases: ['embedMessage', 'sendembed'],
        category: "administrator",
        perms: ['MANAGE_CHANNELS'],
        bot: ['SEND_MESSAGES'],
        usage: ['json_format_embed']
    },
    async execute(client, message, args, guild) {
        if(!args[0]) return;
        else if(args[0]){
            const embed = args.slice(0).join(" ");
            return message.channel.send({embed: embed});
        }
    }
}