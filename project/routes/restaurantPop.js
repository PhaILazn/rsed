const express = require("express");
const Address = require("../models/address");
const Preference = require('../models/preference');
const MenuItem = require('../models/menuitem');
const Menu = require('../models/menu');
const Review = require('../models/review');
const Restaurant = require('../models/restaurant');

const router = express.Router();

router.post("/addRestaurant", (req, res) =>{
    const dummyAddress = new Address(
        req.body
    );
    dummyAddress
    .save()
    .then(result =>{
        console.log(result);
    })
    .catch(err =>{
        console.log(err);
    });

    const dummyMenuItem = new MenuItem({
        name: req.body.name1,
        price: req.body.price1,
    });
    dummyMenuItem
    .save()
    .then(result =>{
        console.log(result);
    })
    .catch(err =>{
        console.log(err);
    });
   
    const dummyMenuItem2 = new MenuItem({
        name: req.body.name2,
        price: req.body.price2,
    });
    dummyMenuItem2
    .save()
    .then(result =>{
        console.log(result);
    })
    .catch(err =>{
        console.log(err);
    });
    
    const dummyMenuItem3 = new MenuItem({
        name: req.body.name3,
        price: req.body.price3,
    });
    dummyMenuItem3
    .save()
    .then(result =>{
        console.log(result);
    })
    .catch(err =>{
        console.log(err);
    });

    const dummyMenuItem4 = new MenuItem({
        name: req.body.name4,
        price: req.body.price4,
    });
    dummyMenuItem4
    .save()
    .then(result =>{
        console.log(result);
    })
    .catch(err =>{
        console.log(err);
    });

    const dummyMenu = new Menu({
        menuItems: [dummyMenuItem, dummyMenuItem2]
    });
    dummyMenu.save()
    .then(result =>{
        console.log(result);
    })
    .catch(err =>{
        console.log(err);
    })
    dummyMenu.populate('menuItems')
   
    const dummyMenu2 = new Menu({
        menuItems: [dummyMenuItem3, dummyMenuItem4]
    });
    dummyMenu2.save()
    .then(result =>{
        console.log(result);
    })
    .catch(err =>{
        console.log(err);
    })
    dummyMenu2.populate('menuItems')

    const dummyReview = new Review({
        rating: req.body.rating,
        comment: req.body.comment,
    });
    dummyReview.save()
    .then(result =>{
        console.log(result);
    })
    .catch(err =>{
        console.log(err);
    });

    const dummyReview2 = new Review({
        rating: req.body.rating2,
        comment: req.body.comment2,
    });
    dummyReview2.save()
    .then(result =>{
        console.log(result);
    })
    .catch(err =>{
        console.log(err);
    });

    const dummyRestaurant = new Restaurant({
        name: req.body.name,
        address: dummyAddress,
        foodCategories: req.body.foodCategories,
        menus: [dummyMenu, dummyMenu2],
        reviews: [dummyReview, dummyReview2],
    });
    dummyRestaurant.save()
    .then(result =>{
        console.log(result);
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
    });
    dummyRestaurant.populate('address')
    dummyRestaurant.populate('menus')
    dummyRestaurant.populate('reviews')
});

module.exports = router;