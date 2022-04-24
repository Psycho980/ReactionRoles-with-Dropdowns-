const mongoose = require("mongoose");

/**
* Roles Structure
* - roleDescription 
* - roleId
* - roleEmoji
*/





const Schema = new mongoose.Schema({
	guildId: String,
	roles: Array,
	
})

module.exports = mongoose.model("reaction-roles", Schema);