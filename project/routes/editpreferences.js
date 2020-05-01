const express = require("express");
const User = require("../models/user");
const Preference = require("../models/preference");

const router = express.Router();

router.get("/", isLoggedIn, function(req, res) {
    Preference.findById(req.user.preferences)
    .exec(function(err, foundPreference) {
        if(err) {
            res.redirect("/");
        }
        res.render("editpreferences", {preference: foundPreference});
    });
});

router.post("/add", isLoggedIn, async(req, res) => {
    var addedCategory = req.body.categories;
    var fetchedPref = await Preference.findById(req.user.preferenes)
    .exec(function(err, foundPreference) {
        if(err){
            res.redirect("/");
        }
        else{
            if(fetchedPref.foodCategories.include(addedCategory)){

            }
            else{
                fetchedPref.foodCategories.push(addedCategory);
            }

            await fetchedPref.foodCategories.save();

            res.render("editpreferences", {preference: foundPreference});
        }
    });
});

router.post("/remove", isLoggedIn, async(req, res) => {
    var fetchedPref = await Preference.findById(req.user.preferences)
    .exec(function(err, fetchedPref) {
        if(err){
            res.redirect("/")
        }
        else{
            for(var i = 0; i < fetchedPref.foodCategories.length; i++){
                if(req.body.categories == fetchedPref.foodCategories[i]){
                    fetchedPref.foodCategories.splice(i);
                }
            }

            await fetchedPref.foodCategories.save();

            res.render("editpreferences", {preference: foundPreference});
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/signin");
}

module.exports = router;