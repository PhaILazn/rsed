const express = require('express');
const User = require('../models/user');
const Address = require('../models/address');
const Menu = require('../models/menu');
const MenuItem = require('../models/menuitem');
const Order = require('../models/order');
const Preference = require('../models/preference');
const Restaurant = require('../models/restaurant');
const Review = require('../models/review');
const Cart = require('../models/cart');

const router = express.Router();

router.get('/:restaurantid/:itemid'), isLoggedIn, async(req, res) => {
    var menuItemId = req.params.id;
    //Finding restaurant to reroute back to restaurant if failed to find item id
    Restaurant.findById(req.params.id).populate('reviews address')
    .populate({
        path: 'menus',
        populate:{
            path: 'menuItems'
        }
    })
    .exec(function(err, foundRestaurant){
        if(err) {
            res.render('/');
        }
        else {
            MenuItem.findById(menuItemId)
            .exec(function(err, foundItem){
                if(err) {
                    res.render('/restaurantprofile', {restaruant: foundRestaurant});
                }
                res.redirect('/itemconfirm', {orderItem: foundItem});
            })
        }
    });
}

router.post('/additem/:restaurantid/:itemid', isLoggedIn, async(req, res) => {
    var menuItemId = req.params.itemid;
    //Check if menuitem exists
    Restaurant.findById(req.params.id).populate('reviews address')
    .populate({
        path: 'menus',
        populate:{
            path: 'menuItems'
        }
    })
    .exec(function(err, foundRestaurant) {
        MenuItem.findById(menuItemId)
        .exec(function(err, foundItem) {
            if(err) {
                res.redirect('/restaurantprofile', {restaurant: req.restaurant});
            }
            //If cart exists then get user shopping cart from db
            ShoppingCart.findById(req.user.shoppingcart)
            .then(function(err, foundCart) {
                if(err) {
                    res.redirect('/restaurantprofile', {restaurant: req.restaurant});
                }
                //Add item to shopping cart and update price
                foundCart.push(menuItemId);
                foundCart.totalPrice = foundCart.totalPrice + foundItem.price;
                foundCart.save();
            })
        });
    });
});

module.exports = router;