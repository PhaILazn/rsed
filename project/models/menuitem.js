var mongoose = require("mongoose");

var MenuItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: {type: String, default: "https://i.imgur.com/mvKmhcw.jpg"},
    restaurant: {type: mongoose.Schema.Types.ObjectId, ref: "Restaurant"},
},{
    versionKey: false
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);