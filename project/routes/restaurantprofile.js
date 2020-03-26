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

router.get('/:id', function(req, res) {
    //Search db for user by ObjectId
    Restaurant.findById(req.params.id, function(err,foundRestaurant){
        if(err){
            console.log(err)
        }else{
            foundRestaurant.populate('foodCategories');
            foundRestaurant.populate('reviews');
            foundRestaurant.populate('address');
            foundRestaurant.populate('menus');
            for (var index = 0; index < foundRestaurant.menus.length; index++) { 
                foundRestaurant.menus[index].populate('menuItems');
            }
//             var resMenu;
//             Menu.findById(foundRestaurant.menus[0], function (err, foundMenu) {
//                 if(err) {
//                     console.log(err);
//                 }else{
//                     foundMenu.populate('menuItems')
//                     resMenu = foundMenu;
//                 }
//             });
            res.render('restaurantprofile',{restaurant: foundRestaurant});
        }
    });
});

module.exports = router;
