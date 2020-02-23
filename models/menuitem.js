var mongoose = require("mongoose");

var MenuItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
});

module.exports = mongoose.model("MenuItemSchema", MenuItemSchema);