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
            res.render('/');
        }else{
            res.render('restaurantprofile', {restaurant: foundRestaurant});
        }
    });
});

router.get('/:id/review/new', isLoggedIn, function (req,res){
    Restaurant.findById(req.params.id,function(err,foundRestaurant){
        if(err){
            res.render('/');
        }else{
            res.render('newreview',{restaurant: foundRestaurant});
        }
    })
});

router.post('/:id/review', isLoggedIn, function (req,res){
    Restaurant.findById(req.params.id, function(err,foundRestaurant){
        if(err){
            console.log(err);
            res.redirect('/');
        }else{
            Review.create(req.body.review,function(err,review){
                if(err){
                    res.redirect('/')
                }else{
                    review.author.id = req.user._id;
                    review.author.firstName = req.user.firstName;
                    review.author.lastName = req.user.lastName;
                    review.save();
                    foundRestaurant.reviews.push(review);
                    foundRestaurant.save();
                    res.redirect('/restaurantprofile/'+ foundRestaurant._id);
                };
            });
        };
    });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/signin");
}



module.exports = router;
