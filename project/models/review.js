var mongoose = require("mongoose");

var ReviewSchema = new mongoose.Schema({
    author:{
        id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        firstName: String,
        lastName: String,
    },
    rating: Number,
    comment: String,
},{
    versionKey: false
});

module.exports = mongoose.model("Review", ReviewSchema);