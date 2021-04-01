const Members = require('./models/levels');
const fs = require('fs');

module.exports = async(client) => {
    /* (async() => {
    //     let file = await fs.readFileSync('./asset/blocklist/domains.txt', 'utf-8');
    //     file = file.split('\n');
    //     const domains = require('./asset/blocklist/domains.json');
    //     console.log(domains.length);
    //     domains.push(...file);
    //     console.log(domains.length);
    //     fs.writeFileSync('./asset/blocklist/domains.json', JSON.stringify(domains), 'utf-8', (err) => {
    //         if(err) throw err;
    //     })
    //     const domains2 = require('./asset/blocklist/domains.json');
    //     console.log(domains2.length);
     })()*/
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