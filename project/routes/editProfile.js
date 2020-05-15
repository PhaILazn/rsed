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
router.post('/:id',isLoggedIn, function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        if (err) {
            console.log(err);
        }
        else {
            if(req.body.firstName) {
                foundUser.firstName = req.body.firstName;
            }
            if(req.body.lastName) {
                foundUser.lastName = req.body.lastName;
            }
            if(req.body.phone) {
                foundUser.phoneNumber = req.body.phone;
            }
            if(req.body.email) {
                foundUser.email = req.body.email;
            }
            if(req.body.description) {
                foundUser.description = req.body.description;
            }
            if(req.body.image) {
                foundUser.image = req.body.image;
            }
            foundUser.save();
            res.render("profile", {user: foundUser, preferences:preferences});
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