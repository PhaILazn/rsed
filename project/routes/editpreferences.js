const express = require("express");
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

router.post("/add", isLoggedIn, async function(req, res) {
    var addedCategory = req.body.addedCategory;
    Preference.findById(req.user.preferences)
    .exec(async function(err, foundPreference) {
        if(err){
            res.redirect("/");
        }
        else{
            if(addedCategory == ""){
            }
            else if(foundPreference.foodCategories.includes(addedCategory)){

            }
            else{
                foundPreference.foodCategories.push(addedCategory);
            }

            await foundPreference.save();

            res.redirect("/editpreferences");
        }
    });
});

router.get("/remove/:category", isLoggedIn, async function (req, res) {
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/signin");
}

module.exports = router;