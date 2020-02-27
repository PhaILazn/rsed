var mongoose = require("mongoose");

var AddressSchema = new mongoose.Schema({
    houseNum: Number,
    street: String,
    city: String,
    zipcode: Number,
},{
    versionKey: false,
});

module.exports = mongoose.model("Address", AddressSchema);