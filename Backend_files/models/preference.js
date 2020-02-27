var mongoose = require("mongoose");

var PreferenceSchema = new mongoose.Schema({
    foodCategories: [String],
},{
    versionKey: false
});

module.exports = mongoose.model("Preference", PreferenceSchema);