var mongoose = require("mongoose");

var PreferenceSchema = new mongoose.Schema({
    foodCategories: [String],
    favRestaurants: [{type: mongoose.Schema.Types.ObjectId, ref: "Restaurant"}],
},{
    versionKey: false
});

module.exports = mongoose.model("Preference", PreferenceSchema);