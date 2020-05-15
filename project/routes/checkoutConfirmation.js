var express = require("express");
var User = require("../models/user");
var moment = require("moment");
var order = require("../models/order");

var router = express.Router();

router.get("/:orderid", isLoggedIn, function (req, res) {
  order
    .findById(req.params.orderid)
    .populate({
      path: "orderItems",
    })
    .exec(function (err, foundorder) {
      if (err) {
        res.redirect("/");
      }
      res.render("checkoutConfirmation", { order: foundorder, moment: moment });
    });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
}

module.exports = router;
