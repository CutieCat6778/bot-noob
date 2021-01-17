const User = require('../../models/users.js');

module.exports = async(_id) => {
	let user = await User.findOne({_id: _id}).catch(e => require('../functions/error')(e));
	if(!user) user = await require('./newUser.js')(_id);
	return user;
}