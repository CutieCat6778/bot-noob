const Levels = require('../../models/levels');

module.exports = async(id) => {
    let data = await Levels.findOne({_id: id}).catch(e => require('../functions/error')(e));
    if(!data) data = await require('./newLevel')(id);
    if(!data.balance){
        data.balance = 0;
        data.bank = 0;
        data.boost = 1;
        data.inventory = [];
        await data.updateOne(data, (err, result) => {
                    if(err) throw err;
                })
        return data;
    }
    if(!data.channels){
        data.channels = [];
        await data.updateOne(data, (err, result) => {
                    if(err) throw err;
                })
    }
    if(!data.server){
        data.server = {
            join: [],
            leave: [],
            invites: []
        }
        await data.updateOne(data, (err, result) => {
                    if(err) throw err;
                })
    }
    if(!data.messages) {
        data.messages = {
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
        }
        await data.updateOne(data, (err, result) => {
                    if(err) throw err;
                })
    }
    if(!data.voice){
        data.voice = [];
        await data.updateOne(data, (err, result) => {
                    if(err) throw err;
                })
    }
    if(!data.updates){
        data.updates = [];
        await data.updateOne(data, (err, result) => {
                    if(err) throw err;
                })
    }
    return data;
}