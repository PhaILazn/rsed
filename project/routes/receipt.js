const express = require("express");
const Address = require("../models/address");
const Preference = require("../models/preference");
const MenuItem = require("../models/menuitem");
const Menu = require("../models/menu");
const Review = require("../models/review");
const Restaurant = require("../models/restaurant");

const router = express.Router();

/*router.get("/", function (req, res) {
  res.render("receipt");
});*/

router.get("/", async function (req, res) {
  //Search db for user by ObjectId
  Restaurant.findById(req.params.id)
    .populate("items address")
    .exec(function (err, foundRestaurant) {
      if (err) {
        res.render("/");
      } else {
        res.render("receipt", { receipt: foundRestaurant });
      }
    });
});

module.exports = router;
