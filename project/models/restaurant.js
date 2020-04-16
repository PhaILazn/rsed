var mongoose = require("mongoose");

var RestaurantSchema = new mongoose.Schema({
    name: String,
    address: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
    foodCategories: [String],
    menus: [{type: mongoose.Schema.Types.ObjectId, ref: "Menu"}],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
    image: {type: String, default: "https://en.wikipedia.org/wiki/Krusty_Krab#/media/File:Krusty_Krab_230b.png"},
},{
    versionKey: false
});
module.exports = mongoose.model("Restaurant", RestaurantSchema);