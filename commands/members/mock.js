const StringTool = require("string-toolkit");
const tool = new StringTool();

module.exports = {
    config: {
        name: "mock",
        aliase: ["mok", "moc"],
        category: 'chat',
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return message.channel.send('Bạn hãy cho tôi một cái Text gì đó!')
            } else if (args[0]) {
                const text = args.slice(0).join(" ");
                const array = tool.toChunks(text, 1);
                for (let i = 0; i < array.length; i++) {
                    const specialCha = require('../../asset/useFullArrays/specialCharacters');
                    if (!specialCha.includes(array[i]) || isNaN(array[i]) == true) {
                        if (i % 2 === 0) {
                            array[i] = array[i].toString().toUpperCase();
                        } else if (i % 2 !== 0) {
                            array[i] = array[i].toString().toLowerCase();
                        }
                    }
                }
                const convertedText = array.join("");
                return message.channel.send(convertedText);
            }
        } catch (e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
}