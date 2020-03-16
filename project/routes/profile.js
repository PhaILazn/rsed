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

router.get('/',function(req, res) {
    res.render("profile");
});

router.get('/:userId', function(req, res) {
    var userId = req.params.userId;
    //Find user by objectId
    User.findById(userId)
    .exec()
    .then(currUser => {
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    res.render("profile");
});

module.exports = router;