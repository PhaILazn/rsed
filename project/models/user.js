var mongoose = require("mongoose");
const ShoppingCart = require('../models/shoppingcart');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    username: String,
    password: String,
    description: { type: String, default: "Change me for new bio ;]" },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    image: { type: String, default: "https://i.imgur.com/YbrgVmU.png" },
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    preferences: { type: mongoose.Schema.Types.ObjectId, ref: "Preference" },
    shoppingCart: {type: mongoose.Schema.Types.ObjectId, ref: "ShoppingCart"},
}, {
    versionKey: false
});

UserSchema.methods.addToCart = async function(itemId) {
    ShoppingCart.findById(itemId)
    .exec(function(err, foundItem) {

        this.save();
    });
}

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", UserSchema);