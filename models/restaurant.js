var mongoose = require("mongoose");

var RestaurantSchema = new mongoose.Schema({
    name: String,
    address: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
    foodCategories: [String],
    menus: [{type: mongoose.Schema.Types.ObjectId, ref: "Menu"}],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);