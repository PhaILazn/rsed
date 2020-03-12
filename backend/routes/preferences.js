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
    res.send("Test");
});

router.get('/:userId', function(req, res) {
    var userId = req.params.userId;
    User.findById(userId)
    .exec()
    .then(currUser => {
        Preference.findById(currUser.preferences)
        .exec()
        .then(currPref => {
            console.log(currPref);
            res.status(200).json(currPref);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    // User.findOne({username: "Sebastian"}, function(err, currUser) {
    //     if(err) return handleError(err);
    //     console.log(currUser.username);
    //     currPref = currUser.preferences;
    // });
    // try {
    //     res.send(currPref);
    //     } catch (err) {
    //     res.status(500).send(err);
    // }
});

module.exports = router;