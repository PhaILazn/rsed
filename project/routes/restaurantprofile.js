const express = require('express');
const Restaurant = require('../models/restaurant');
const Review = require('../models/review');

const router = express.Router({mergeParams:true});
//show the restaurant profile
router.get('/:id', function(req, res) {
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

//grab the page to make a new review for the restaurant
router.get('/:id/review/new', isLoggedIn, function (req,res){
    Restaurant.findById(req.params.id,function(err,foundRestaurant){
        if(err){
            res.render('/');
        }else{
            res.render('newreview',{restaurant: foundRestaurant});
        }
    })
});

//post the review onto database and display it onto the website
router.post('/:id/review', isLoggedIn, function (req,res){
    Restaurant.findById(req.params.id, function(err,foundRestaurant){
        if(err){
            console.log(err);
            res.render('/');
        }else{
            Review.create(req.body.review,function(err,review){
                if(err){
                    res.redirect('/')
                }else{
                    review.author.id = req.user._id;
                    review.author.firstName = req.user.firstName;
                    review.author.lastName = req.user.lastName;
                    review.rating = req.body.rating;
                    review.save();
                    foundRestaurant.reviews.push(review);
                    foundRestaurant.save();
                    res.redirect('/restaurantprofile/'+ foundRestaurant._id);
                };
            });
        };
    });
});

//grab the same exisiting review to edit the review
router.get('/:id/review/:review_id/edit',checkReviewOwnership, function(req,res){
    Review.findById(req.params.review_id, function(err,foundReview){
        if(err){
            res.render('/');
        }else{
            res.render('editreview',{restaurant_id: req.params.id, review: foundReview});
        }
    });
});
// REview Updating review string and send in review edits
router.put('/:id/review/:review_id',checkReviewOwnership, function(req,res){
    Review.findByIdAndUpdate(req.params.review_id,req.body.review,function(err,updatedReview){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/restaurantprofile/'+req.params.id);
        }
    });
});

//GET REQUESTS ON REVIEW SECTION IMMEDIATELY DELETES REVIEW
router.delete('/:id/review/:review_id',checkReviewOwnership, function(req,res){
    Review.findByIdAndRemove(req.params.review_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("back");
        }
    })
});


function checkReviewOwnership(req,res,next){
    if(req.isAuthenticated()){ //checks if user is logged in to edit the review
        Review.findById(req.params.review_id, function(err,foundReview){
            if(err){
                res.redirect('back');
            }else{ //checks if user owns the review
                if(foundReview.author.id.equals(req.user.id)){
                    next();
                }else{
                    res.redirect('back');
                }
            }
        })
    }else{
        res.redirect('back');
    }
}

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/signin");
}

module.exports = router;
