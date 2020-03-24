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

//Route for user profile
router.get('/:id',isLoggedIn, function(req, res) {
    //Remove when preference functionality is fixed
    var preferences = [
        {name: "DcManalds", image: "https://c4.wallpaperflare.com/wallpaper/640/229/132/food-computer-desktop-backgrounds-wallpaper-preview.jpg"},
        {name: "Kaising Ranes", image:"https://p1.pxfuel.com/preview/519/827/721/diner-food-chips.jpg"},
        {name: "Kurger Bing", image: "https://c4.wallpaperflare.com/wallpaper/142/1008/877/food-burgers-burger-fast-food-wallpaper-preview.jpg"},
        {name: "DcManalds", image: "https://c4.wallpaperflare.com/wallpaper/640/229/132/food-computer-desktop-backgrounds-wallpaper-preview.jpg"},
        {name: "Kaising Ranes", image:"https://p1.pxfuel.com/preview/519/827/721/diner-food-chips.jpg"},
        {name: "Kurger Bing", image: "https://c4.wallpaperflare.com/wallpaper/142/1008/877/food-burgers-burger-fast-food-wallpaper-preview.jpg"},
        {name: "DcManalds", image: "https://c4.wallpaperflare.com/wallpaper/640/229/132/food-computer-desktop-backgrounds-wallpaper-preview.jpg"},
        {name: "Kaising Ranes", image:"https://p1.pxfuel.com/preview/519/827/721/diner-food-chips.jpg"},
        {name: "Kurger Bing", image: "https://c4.wallpaperflare.com/wallpaper/142/1008/877/food-burgers-burger-fast-food-wallpaper-preview.jpg"}
    ]
    //Search db for user by ObjectId
    User.findById(req.params.id, function(err,foundUser){
        if(err){
            console.log(err)
        }else{
            res.render('profile',{user: foundUser, preferences: preferences});
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