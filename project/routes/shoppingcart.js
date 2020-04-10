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

router.get('/', isLoggedIn, function(req, res) {
    var menuItems = req.menuItems;
    var jsonMenuItems = {"menuItem":[]};
    menuItems.forEach(menuItem => {
        MenuItem.findById(menuItem).populate('restaurant').exec(function(err, foundMItem) {
            if(err) {
                console.log(err);
            }
            else {
                jsonMenuItems['menuItem'].push(menuItem);
            }
        });
    });
    console.log(err);
    res.render('shoppingcart', jsonMenuItems); 
});

router.get('/add/:id', isLoggedIn, function(req, res) {
    var menuItemId = req.menuItemId;
    var cart = new Cart(req.session.cart? req.session.cart : {});
    MenuItem.findById(menuItemId, function(err, menuItem) {
        if(err) {
            return res.redirect('/');
        }
        else {

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