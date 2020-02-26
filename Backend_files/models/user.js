var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    id: String,
	username: String,
    password: String,
    address: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
    phone: Number,
    orderHistory: [{type: mongoose.Schema.Types.ObjectId, ref: "Order"}],
    preferences: {type: mongoose.Schema.Types.ObjectId, ref: "Preference"},
});

module.exports = mongoose.model("User", UserSchema);