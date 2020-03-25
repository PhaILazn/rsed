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

router.get('/:id', function(req, res) {
    var userId = req.params.userId;
    //Find user by objectId
    User.findById(userId)
    .exec()
    .then(currUser => {
        //Find preference referenced by User
        Preference.findById(currUser.preferences)
        .exec()
        //Return the preferences to client
        .then(currPref => {
            var prefs = [];
            currPref.foodCategories.array.forEach(element => {
                prefs.push(element);
            });
            console.log(currPref);
            //res.render()
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
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