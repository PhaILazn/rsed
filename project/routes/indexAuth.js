var express = require('express');
var router = express.Router({mergeParams: true,});
var passport = require("passport");
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

//grab home page and render as homepage
router.get("/", function(req, res){
    res.render('index');
});

//route to signup page
router.get("/signup",function(req, res){
    res.render('signup');
});

router.post('/signup', function(req, res) {
    var newUser = new User(req.body)
    User.register(new User({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        username: newUser.username,
        image: newUser.image
    }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.send(err);
            return res.render('signup');
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        })
    });
});

//signin page will route to adding a username
router.get("/signin", function(req, res){
    res.render('signin');
});
router.post('/signin', passport.authenticate("local",{
    successRedirect: "/", failureRedirect: '/signin'}), function(req,res){
});

//logging out the user
router.get('/logout', function(req,res){
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/signin");
}

module.exports = router;