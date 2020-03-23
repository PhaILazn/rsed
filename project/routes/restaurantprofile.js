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

router.get('/:id',isLoggedIn, function(req, res) {
    //Search db for user by ObjectId
    Restaurant.findById(req.params.id, function(err,foundRestaurant){
        if(err){
            console.log(err)
        }else{
            foundRestaurant.populate('foodCategories');
            foundRestaurant.populate('reviews');
            var resMenu;
            Menu.findById(foundRestaurant.menus[0], function (err, foundMenu) {
                if(err) {
                    console.log(err);
                }else{
                    resMenu = foundMenu;
                }
            });
            res.render('restaurantprofile',{restaurant: foundRestaurant, menu: resMenu});
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