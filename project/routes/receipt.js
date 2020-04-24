const express = require("express");

const Restaurant = require("../models/restaurant");

const router = express.Router();

/*router.get("/", function (req, res) {
  res.render("receipt");
});*/

router.get("/", function (req, res) {
  //Search db for user by ObjectId
  Restaurant.find(req.params).populate("address").populate({
    path: 'menus',
    populate:{
      path: "menuItems",
    }
  }).exec(function(err,foundRestaurant){
    if(err){
      res.redirect('/');
    }
    res.render('receipt',{restaurant: foundRestaurant})
  })
});

module.exports = router;
