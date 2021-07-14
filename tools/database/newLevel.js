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
            balance: 0,
            bank: 0,
            boost: 1,
            inventory: []
        })
        await data.save();
        return data;
    }
}