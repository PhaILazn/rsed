var mongoose = require("mongoose");

var PreferenceSchema = new mongoose.Schema({
    foodCategories: [String],
});

module.exports = mongoose.model("Preference", PreferenceSchema);