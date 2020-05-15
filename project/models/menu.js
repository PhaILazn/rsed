var mongoose = require("mongoose");

var MenuSchema = new mongoose.Schema({
    //Probably add a restuarant field to verify that this if a menuItem is from a restuarant
    //So that if a menuItem not from the restaurant is trying to be added to the order than it would be rejected
    //Also so that Menu has a purpose or else itd be simpler to have arrays of MenuItem's
    name: {type: String, default: "menu"},
    menuItems: [{type: mongoose.Schema.Types.ObjectId, ref: "MenuItem"}],
},{
    versionKey: false,
});

module.exports = mongoose.model("Menu", MenuSchema);