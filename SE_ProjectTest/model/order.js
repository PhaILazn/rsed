var mongoose = require("mongoose");

var OrderSchema = new mongoose.Schema({
    //driver: {type: mongoose.Schema.Types.ObjectId, ref: "Driver"},
    restuarants: [{type: mongoose.Schema.Types.ObjectId, ref: "Restaurant"}],
    orderItems: [{type: mongoose.Schema.Types.ObjectId, ref: "MenuItem"}],
    totalPrice: Number,
    date: Date,
});

module.exports = mongoose.model("Order", OrderSchema);