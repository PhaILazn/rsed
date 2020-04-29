const express = require("express");
const User = require("../models/user");
const Order = require("../models/order");
var moment = require("moment");

const router = express.Router();

/*router.get("/", function (req, res) {
  res.render("receipt");
});*/

/*router.get("/", function (req, res) {
  //Search db for user by ObjectId
  Restaurant.find(req.params)
    .populate("address")
    .populate({
      path: "menus",
      populate: {
        path: "menuItems",
      },
    })
    .exec(function (err, foundRestaurant) {
      if (err) {
        res.redirect("/");
      }
      res.render("receipt", { restaurant: foundRestaurant });
    });
});*/

router.get("/:id", isLoggedIn, function (req, res) {
  Order.findById(req.params.id)
    .populate("orderItems")
    .exec(function (err, foundorder) {
      if (err) {
        res.redirect("/");
      }
      res.render("receipt", { order: foundorder, moment: moment });
    });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
}

module.exports = router;
