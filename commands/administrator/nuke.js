module.exports = {
    config: {
        name: "nuke",
        aliases: ["renew"],
        category: "moderation",
        perms: ["MANAGE_CHANNELS", "MANAGE_GUILD"],
        bot: ["MANAGE_CHANNELS"],
        usage: []
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                message.channel.send("Bạn có chắc chắn là muốn **nuke** channel này không? [y/n]");
                const filter = (user) => user.id == message.author.id;
                let collected = await require('../../tools/collectMessage')(message, filter);
                switch (collected.content.toLowerCase()) {
                    default:
                        return message.channel.send("Câu trả lời không hợp lệ.");
                    case "y":
                        const oldChannel = message.channel;
                        const obj = {
                            type: oldChannel.type
                        }
                        if(oldChannel.parent){
                            obj.parent = oldChannel.parent.id
                        }
                        const channel = await message.guild.channels.create(oldChannel.name, obj);
                        obj.parent ? await channel.setParent(oldChannel.parent.id) : null
                        await channel.setPosition(oldChannel.position);
                        await oldChannel.delete();
                        //done
                        await channel.send("Đã nuke channel này");
                        return channel.send("https://i.pinimg.com/originals/cb/2f/28/cb2f28639fddb230cdf55fbaab48a046.gif");
                    case "n":
                        return message.channel.send("Đã hủy.");
                }
            } else if (args[0]) {
                const oldChannel = message.guild.channels.cache.get(await require('../../tools/mentions')(args[0]));
                if (!oldChannel) return message.channel.send("Không tìm thấy channel");
                message.channel.send("Bạn có chắc chắn là muốn **nuke** channel này không? [y/n]");
                const filter = (user) => user.id == message.author.id;
                let collected = await require('../../tools/collectMessage')(message, filter);
                switch (collected.content) {
                    default:
                        return message.channel.send("Câu trả lời không hợp lệ.");
                    case "y":
                        const obj = {
                            type: oldChannel.type
                        }
                        if(oldChannel.parent){
                            obj.parent = oldChannel.parent.id
                        }
                        const channel = await message.guild.channels.create(oldChannel.name, obj);
                        obj.parent ? await channel.setParent(oldChannel.parent.id) : null
                        await channel.setPosition(oldChannel.position);
                        await oldChannel.delete();
                        //done
                        await channel.send("Đã nuke channel này");
                        return channel.send("https://i.pinimg.com/originals/cb/2f/28/cb2f28639fddb230cdf55fbaab48a046.gif");
                    case "n":
                        return message.channel.send("Đã hủy.");
                }
            }
        } catch (e) {
            return require('../../tools/error')(e, message);
        }
    }
}