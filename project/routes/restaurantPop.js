const express = require("express");
const Address = require("../models/address");
const Preference = require('../models/preference');
const MenuItem = require('../models/menuitem');
const Menu = require('../models/menu');
const Review = require('../models/review');
const Restaurant = require('../models/restaurant');

const router = express.Router();

router.post("/addPreference", (req, res) =>{
    const dummyPreference = new Preference({

    });
});

router.post("/addReview", (req, res) =>{
    const dummyReview = new Review({
        rating: req.body.rating,
        comment: req.body.comment,
    });
});

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

    const dummyReview = new Review({
        rating: req.body.rating,
        comment: req.body.comment,
    });
    dummyReview
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



 //   const dummyRestaurant = new Restaurant({
 //       name: req.body.name,
 //       
 //   });
});

module.exports = router;