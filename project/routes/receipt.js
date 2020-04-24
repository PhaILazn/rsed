const express = require("express");
const User = require("../models/user");
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

router.get("/", isLoggedIn, function (req, res) {
  User.findById(req.user)
    .populate({
      path: "orderHistory",
      populate: {
        path: "orderItems",
      },
    })
    .exec(function (err, foundorder) {
      if (err) {
        res.redirect("/");
      }
      for (var i = 0; i < foundorder.orderHistory.length; i++) {
        console.log(foundorder.orderHistory[i]);
      }

      res.render("receipt", { orderHistory: foundorder, moment: moment });
    });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
}

module.exports = router;
