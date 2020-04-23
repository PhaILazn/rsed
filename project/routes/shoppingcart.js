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
router.get('/remove/:id', isLoggedIn, function(req, res) {
    Cart.findById(req.user.shoppingCart)
    .populate({
        path: 'items',
    })
    .exec(function(err, foundCart) {
        for(var i = 0; i < foundCart.items.length; ++i) {
            console.log(foundCart.items[i]._id);
            if(foundCart.items[i]._id == req.params.id) {
                foundCart.totalPrice = foundCart.totalPrice - foundCart.items[i].price;
                foundCart.items.splice(i,i + 1);
                break;
            }
        }
        foundCart.save();
    });
    // Cart.updateOne(
    //     {"_id": req.user.shoppingCart},
    //     {"$pull": {"items": req.params.id}},
    //     function(err, status) {
    //         console.log(status);
    //     }
    // );
    res.redirect('/shoppingcart');
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/signin");
}

module.exports = router;