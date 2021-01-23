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
        message.channel.send({embed: {}})
    }
}