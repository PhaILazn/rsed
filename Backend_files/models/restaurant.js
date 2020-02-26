var mongoose = require("mongoose");

var RestaurantSchema = new mongoose.Schema({
    name: String,
    address: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
    foodCategories: {type: mongoose.Schema.Types.ObjectId, ref: "Preference"},
    menus: [{type: mongoose.Schema.Types.ObjectId, ref: "Menu"}],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);