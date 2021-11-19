const Levels = require('../../models/levels');

module.exports = async(id) => {
    let data = await Levels.findOne({_id: id}).catch(e => require('../functions/error')(e));
    if(data) return data;
    else if(!data){
        data = new Levels({
            _id: id,
            total: 0,
            exp: 0,
            level: 0,
            voice: [],
            messages: {
                message: [],
                updated: [],
                deleted: [],
                links: [],
                bot: [],
                stickers: [],
                emojis: [],
                reactions: [],
                mentions: [],
                mentionsBy: []
            },
            server: {
                join: [],
                leave: [],
                invites: [],
            },
            channels: [],
            updates: []
        })
        await data.save();
        return data;
    }
}
