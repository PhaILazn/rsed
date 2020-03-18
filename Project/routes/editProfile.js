const express = require('express');
const User = require('../models/user');
const Address = require('../models/address');
const Menu = require('../models/menu');
const MenuItem = require('../models/menuitem');
const Order = require('../models/order');
const Preference = require('../models/preference');
const Restaurant = require('../models/restaurant');
const Review = require('../models/review');

const router = express.Router();

//Page for editing profile
router.get('/:id',isLoggedIn, function(req, res) {
    console.log(req.params.id);
    User.findById(req.params.id, function(err, foundUser) {
        if(err) {
            console.log(err);
        }
        else {
            res.render('editProfile', {user: foundUser});
        }
    })
});

//Route for editing profile
router.patch('/:id',isLoggedIn, function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        if (err) {
            console.log(err);
        }
        else {
            if(req.body.firstName) {
                console.log(req.body.firstName);
                foundUser.firstName = req.body.firstName;
            }
            if(req.body.lastName) {
                console.log(req.body.lastName);
                foundUser.lastName = req.body.lastName;
            }
            if(req.body.username) {
                console.log(req.body.username);
                //foundUser.username = req.body.username;
            }
            if(req.body.phone) {
                console.log(req.body.phone);
                foundUser.phoneNumber = req.body.phone;
            }
            if(req.body.description) {
                console.log(req.body.description);
                foundUser.description = req.body.description;
            }
            foundUser.save();
            res.render("profile", {user: foundUser});
        }
    });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/signin");
}

module.exports = router;