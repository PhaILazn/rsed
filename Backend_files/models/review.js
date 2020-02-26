var mongoose = require("mongoose");

var ReviewSchema = new mongoose.Schema({
    rating: Number,
    comment: String,
});

module.exports = mongoose.model("Review", ReviewSchema);