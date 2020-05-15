const express = require("express");
const User = require("../models/user");

const router = express.Router();

//Route for user profile
router.get("/:id", isLoggedIn, function (req, res) {
  //Search db for user by ObjectId
  User.findById(req.params.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      res.render("profile", { user: foundUser});
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
