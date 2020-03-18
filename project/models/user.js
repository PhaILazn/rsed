var mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    username: String,
    password: String,
    description: {type: String, Default: "Lorem Ipsum"},
    address: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
    image: {type: String, default: "https://sadanduseless.b-cdn.net/wp-content/uploads/2019/05/funny-corgi-butts4.jpg"},
    orderHistory: [{type: mongoose.Schema.Types.ObjectId, ref: "Order"}],
    preferences: {type: mongoose.Schema.Types.ObjectId, ref: "Preference"},
},{
    versionKey: false
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", UserSchema);