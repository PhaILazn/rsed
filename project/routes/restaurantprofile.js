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

router.get('/:id', async function(req, res) {
    //Search db for user by ObjectId
    Restaurant.findById(req.params.id).populate('reviews address').populate({
        path: 'menus',
        populate:{
            path: 'menuItems'
        }
    }).exec(function(err,foundRestaurant){
        if(err){
            console.log(err)
        }else{
            res.render('restaurantprofile',{restaurant: foundRestaurant});
        }
    });
});

module.exports = router;
