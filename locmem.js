const Members = require('./models/levels');
const fs = require('fs');

module.exports = async(client) => {
    let text = ""
    const members = await Members.find().catch(e => console.log(e));
    client.guilds.cache.get("721203266452586507").members.cache.forEach(a => {
        const data = members.find(b => b._id == a.id);
        if((!data || data.total == 0 || !data.total) && a.user.bot == false){
            text += `${a.user.tag} - ${a.id}\n`;
        }
        fs.writeFileSync('./members.txt', text, 'utf-8', (err) => {
            if(err) throw err;
        })
    })

}