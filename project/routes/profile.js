const express = require("express");
const User = require("../models/user");
const Address = require("../models/address");
const Menu = require("../models/menu");
const MenuItem = require("../models/menuitem");
const Order = require("../models/order");
const Preference = require("../models/preference");
const Restaurant = require("../models/restaurant");
const Review = require("../models/review");

const router = express.Router();

//Route for user profile
router.get("/:id", isLoggedIn, function (req, res) {
  //Search db for user by ObjectId
  User.findById(req.params.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      res.render("profile", { user: foundUser, preferences: preferences });
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
}

module.exports = router;
