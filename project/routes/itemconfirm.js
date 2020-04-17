const express = require('express');
const User = require('../models/user');
const Address = require('../models/address');
const Menu = require('../models/menu');
const MenuItem = require('../models/menuitem');
const Order = require('../models/order');
const Preference = require('../models/preference');
const Restaurant = require('../models/restaurant');
const Review = require('../models/review');
const Cart = require('../models/shoppingcart');

const router = express.Router();

router.get('/:restaurantid/:itemid', isLoggedIn, async(req, res) => {
    //Finding restaurant to reroute back to restaurant if failed to find item id
    console.log("in get");
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
                res.render('itemconfirm', {orderItem: foundItem, restaurant: foundRestaurant});
            })
        }
    });
});

router.post('/:restaurantid/:itemid', isLoggedIn,  async(req, res) => {
    var menuItemId = req.params.itemid;
    var quantity = req.body.itemQuantity;
    console.log("in post");
    //Check if menuitem exists
    Restaurant.findById(req.params.restaurantid).populate('reviews address')
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
        MenuItem.findById(menuItemId)
        .exec(function(err, foundItem) {
            if(err) {
                res.redirect('/restaurantprofile/' + foundRestaurant._id);
            }
            console.log(foundRestaurant);
            //If cart exists then get user shopping cart from db
            Cart.findById(req.user.shoppingCart)
            .exec(function(err, foundCart) {
                if(err) {
                    res.redirect('/restaurantprofile/' + foundRestaurant._id);
                }
                else if(!foundCart) {

                }
                //Add item to shopping cart and update price
                for(var i = 0; i < quantity; ++i) {
                    foundCart.items.push(menuItemId);
                }
                foundCart.totalPrice = foundCart.totalPrice + (foundItem.price * quantity);
                foundCart.save();
                res.redirect('/restaurantprofile/' + foundRestaurant._id);
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