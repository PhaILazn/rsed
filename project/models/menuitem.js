var mongoose = require("mongoose");

var MenuItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: {type: String, default: "https://en.wikipedia.org/wiki/Krusty_Krab#/media/File:Krusty_Krab_230b.png"},
},{
    versionKey: false
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);