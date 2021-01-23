const Levels = require('../../models/levels');

module.exports = async(id) => {
    let data = await Levels.findOne({_id: id}).catch(e => require('../functions/error')(e));
    if(!data) data = await require('./newLevel')(id);
    return data;
}