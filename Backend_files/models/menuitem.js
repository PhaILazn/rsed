var mongoose = require("mongoose");

var MenuItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
},{
    versionKey: false
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);