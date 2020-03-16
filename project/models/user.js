var mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String,
    address: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
    orderHistory: [{type: mongoose.Schema.Types.ObjectId, ref: "Order"}],
    preferences: {type: mongoose.Schema.Types.ObjectId, ref: "Preference"},
},{
    versionKey: false
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", UserSchema);