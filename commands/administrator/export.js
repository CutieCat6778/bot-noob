const Users = require('../../models/users');
const xlsx = require('xlsx');

module.exports = {
    config: {
        name: "exports",
        aliases: ['export', 'expt'],
        perms: ['MANAGE_GUILD'],
        bot: ['SEND_MESSAGES'],
        category: 'administrator',
        usage: []
    },
    async execute(client, message, args, guild) {
        let datas = await Users.find().catch(e => require('../../tools/functions/error')(e, message));
        const array = [];
        datas.forEach(e => {
            const user = message.guild.members.cache.get(e._id)
            array.push({
                "id": e._id,
                "birthday": e.birthday ? `${e.birthday.day}/${e.birthday.month}` : "none",
                "year": e.birthday ? (e.birthday.year ? e.birthday.year : "none") : "none",
                "name": e.realName ? e.realName : "none",
                "discordName": user ? user.user.tag : "Invalid",
                "location": e.location ? e.location : "none",
                "joinedAt": !user ? "Invalid" : user.joinedAt.toLocaleString()
            })
        })
        let workbook = xlsx.utils.book_new(); 
        await xlsx.utils.book_append_sheet(workbook, xlsx.utils.json_to_sheet(array), "sample"); 
        await xlsx.writeFile(workbook,"res.xlsx");
        return message.author.send('Here', {files: ["./res.xlsx"]});
    }
}