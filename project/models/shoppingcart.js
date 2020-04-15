var mongoose = require("mongoose");

var ShoppingCartSchema = new mongoose.Schema({
    items: [{type: mongoose.Schema.Types.ObjectId, ref: "MenuItem"}],
    totalPrice: Number,
},{
    versionKey: false
});

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema);