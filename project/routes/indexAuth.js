var express = require("express");
var router = express.Router({ mergeParams: true });
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require('../models/user');
var ShoppingCart = require('../models/shoppingcart');
var Preferences = require('../models/preference');


router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
//grab home page and render as homepage
router.get("/", function(req, res) {
  res.render("index");
});

//route to signup page
router.get("/signup", function(req, res) {
  res.render("signup");
});

router.post("/signup", function(req, res) {
  var userCart = new ShoppingCart({
      totalPrice: 0,
    });
    userCart.save();
  var userPref = new Preferences();
  userPref.save();
  var newUser = new User(req.body);
  User.register(
    new User({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      username: newUser.username,
      image: newUser.image,
      shoppingCart: userCart._id,
      preferences: userPref._id,
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        res.send(err);
        return res.render("signup");
      }
      passport.authenticate("local")(req, res, function() {
        res.redirect("/");
      });
    }
  );
});

//signin page will route to adding a username
router.get("/signin", function(req, res) {
  res.render("signin");
});
router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin"
  }),
  function(req, res) {}
);

//logging out the user
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
