var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    id: String,
	username: String,
    password: String,
    //address: {type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
    //phone: Int16Array,
});

module.exports = mongoose.model("User", UserSchema);