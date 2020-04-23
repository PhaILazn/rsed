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

router.get('/', isLoggedIn, function(req, res) {
    Cart.findById(req.user.shoppingCart)
    .populate({
        path: 'items',
    })
    .exec(function(err, foundCart) {
        if(err) {
            res.redirect('/');
        }
        res.render('shoppingcart', {currentOrder: foundCart});
    });
});

//Route to remove item from a shopping cart
router.get('/remove/:id', isLoggedIn, async(req, res) => {
    console.log("Delete 1");
    Cart.findById(req.user.shoppingCart)
    .populate({
        path: 'items',
    })
    .exec(async(err, foundCart) => {
        for(var i = 0; i < foundCart.items.length; ++i) {
            if(foundCart.items[i]._id == req.params.id) {
                console.log(foundCart.items[i]._id);
                foundCart.totalPrice = foundCart.totalPrice - foundCart.items[i].price;
                foundCart.items.splice(i,1);
                i = foundCart.items.lenght + 1;
                break;
            }
        }
        var wait = await foundCart.save();
        res.redirect('/shoppingcart');
    })
    .catch((err => function(err){
        res.redirect('/');
    }));
});

//Route to place order
router.get('/checkout', isLoggedIn, function(req, res) {
    Cart.findById(req.user.shoppingCart)
    .populate({
        path: 'items',
    })
    .exec(function(err, foundCart) {
        if(err) {
            res.redirect('/');
        }
        var newOrder = new Order({
            orderItems: foundCart.items,
            totalPrice: foundCart.totalPrice,
            date: new Date(),
        }
        )
        req.user.orderHistory.push(newOrder._id);
        newOrder.save();
        req.user.save();
        foundCart.items.splice(0,foundCart.items.length);
        foundCart.totalPrice = 0;
        foundCart.save();
        res.redirect('/shoppingcart');
    });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/signin");
}

module.exports = router;