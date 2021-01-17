const User = require('../../models/users.js');

module.exports = async(id) => {
	const user = new User({
		_id: id,
	    birthday: {
	        day: 0,
	        month: 0,
	        year: 0
	    },
	    realName: "",
	    location: ""
	})
	await user.save();
	return user;
}