var express = require('express');
var User = require('../models/user');
var moment = require('moment');

var router = express.Router();

router.get('/', isLoggedIn, function(req,res){
    User.findById(req.user).populate({
        path: 'orderHistory',
    }).exec(function(err, foundorder){
        if(err){
            res.redirect('/');
        }
        res.render('orderhistory',{orderHistory: foundorder,moment:moment});
    });
  
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/signin");
}

module.exports = router;