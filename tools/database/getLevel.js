const Levels = require('../../models/levels');

module.exports = async(id) => {
    let data = await Levels.findOne({_id: id}).catch(e => require('../functions/error')(e));
    if(!data) data = await require('./newLevel')(id);
    if(!data.balance){
        data.balance = 0;
        data.bank = 0;
        data.boost = 1;
        data.inventory = [];
        await data.save();
        return data;
    }
    return data;
}