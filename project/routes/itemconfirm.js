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

router.get('/:restaurantid/:itemid', isLoggedIn, async(req, res) => {
    //Finding restaurant to reroute back to restaurant if failed to find item id
    Restaurant.findById(req.params.restaurantid).populate('reviews address')
    .populate({
        path: 'menus',
        populate:{
            path: 'menuItems'
        }
    })
    .lean()
    .exec(function(err, foundRestaurant){
        if(err) {
            //Restaurant dne redirect to homepage
            res.render('/');
        }
        else {
            MenuItem.findById(req.params.itemid)
            .exec(function(err, foundItem){
                if(err) {
                    //Menu item dne redirect to restuarant profile
                    res.redirect('/restaurantprofile/' + foundRestaurant._id);
                }
                console.log(foundItem.name);
                res.render('itemconfirm', {orderItem: foundItem});
            })
        }
    });
});

router.post('/additem/:restaurantid/:itemid', isLoggedIn,  async(req, res) => {
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
        if(err) {
            res.redirect('/');
        }
        req.session.restaurant = foundRestaurant;
        MenuItem.findById(menuItemId)
        .exec(function(err, foundItem) {
            if(err) {
                res.redirect('/restaurantprofile/' + foundRestaurant._id);
            }
            //If cart exists then get user shopping cart from db
            ShoppingCart.findById(req.user.shoppingcart)
            .then(function(err, foundCart) {
                if(err) {
                    res.redirect('/restaurantprofile/' + foundRestaurant._id);
                }
                //Add item to shopping cart and update price
                foundCart.push(menuItemId);
                foundCart.totalPrice = foundCart.totalPrice + foundItem.price;
                foundCart.save();
            })
        });
    });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/signin");
}

module.exports = router;