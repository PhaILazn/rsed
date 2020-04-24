var mongoose = require("mongoose");
var moment = require('moment-timezone');

const date = moment().tz("America/Los_Angeles").format();
var OrderSchema = new mongoose.Schema({
    //driver: {type: mongoose.Schema.Types.ObjectId, ref: "Driver"},
    restaurants: [{type: mongoose.Schema.Types.ObjectId, ref: "Restaurant"}],
    orderItems: [{type: mongoose.Schema.Types.ObjectId, ref: "MenuItem"}],
    totalPrice: Number,
    date: {type: Date, default:date},
},{
    versionKey: false
});

module.exports = mongoose.model("Order", OrderSchema);
