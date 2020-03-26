const express = require("express");
const Address = require("../../models/address");
const Preference = require("../../models/preference");
const MenuItem = require("../../models/menuitem");
const Menu = require("../../models/menu");
const Review = require("../../models/review");
const Restaurant = require("../../models/restaurant");

const router = express.Router();

router.get("/", function(req, res) {
  res.render("restauranttypes/mediterranean");
});

module.exports = router;
