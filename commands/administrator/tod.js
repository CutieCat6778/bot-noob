const newEmbed = require('../../classes/newEmbed');

module.exports = {
    config: {
        name: "tod",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        category: "members",
        usage: [],
        aliases: ['sht']
    },
    async execute(client, message, args, guildCache) {
        const embed = new newEmbed()    
            .setTitle('Thử  thách hay Sự thật ?')
            .setDescription('Người chơi sẽ react 👍 để có thể tham gia!')
            .setFooter('Thử thách hay sự thật?')
            .setTimestamp()
        message.channel.send(embed).then(async m => {
            m.react('👍');
            const filter = (reaction, user) => {
                return reaction.emoji.name === '👍'
            };
            const users = [];
            const collector = m.createReactionCollector(filter, { time: 15000 });
            collector.on('collect', (reaction, user) => {
                if(user.bot) return;
                users.push(user.id);
            })
            collector.on('end', collected => {
                let user1, user2;
                function gen(a){
                    const rand1 = Math.floor(Math.random() * (a ? a : users.length));
                    const rand2 = Math.floor(Math.random() * (a ? a : users.length));
                    return [rand1, rand2];
                }
                const rand = gen();
                user1 = message.guild.members.cache.get(users[rand[0]]);
                user2 = message.guild.members.cache.get(users[rand[1]]);
                if(user1 && user2){
                    const rand2 = gen(99);
                    let whowin = false;
                    rand2[0] > (rand2[1]) ? whowin = !whowin : null;
                    const embed1 = new newEmbed()
                        .setTitle(`${user1.displayName.slice(0, 1).toUpperCase() + user1.displayName.slice(1)} đã thắng ${user2.displayName.slice(0, 1).toUpperCase() + user2.displayName.slice(1)}`)
                        .setDescription(`__${user2.displayName.slice(0, 1).toUpperCase() + user2.displayName.slice(1)}__ phải ${whowin ? `nói ra một **sự thật** mà người thắng hỏi` : `làm một **thử thách** mà người thắng đưa ra`} !!!`)
                        .setFooter('sự thật hay thử thách')
                        .setTimestamp()
                    m.edit(embed1);
                }
            })
        })
    }
}