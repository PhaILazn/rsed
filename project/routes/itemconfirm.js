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



router.post('/additem/:restaurantid/:itemid', isLoggedIn, async(req, res) => {
    var menuItemId = req.params.itemid;
    MenuItem.findById(menuItemId)
    .then(foundItem => {
        ShoppingCart.findById(req.user.shoppingcart)
        .then(foundCart => {
            foundCart.push(menuItemId);
            foundCart.save();
        })
        .catch(err => res.redirect('/restaurantprofile/', {restaurant: req.restaurant}));
    })
    .catch(err => res.redirect('/restaurantprofile', {restaurant: req.restaurant}));
});

module.exports = router;