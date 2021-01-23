module.exports = {
    config: {
        name: "help",
        aliases: ['h', "guide"],
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        usage: [],
        category: "members"
    },
    async execute(client, message, args, guild){
        if(!args[0]){
            return message.channel.send({embed: {}})
        }else if(args[0]){
            
        }
    }
}