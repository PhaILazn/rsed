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

router.get("/", async (req, res) => {
    const users = await User.find({});
    const address = await Address.find({});
    const menu = await Menu.find({});
    const menuitem = await MenuItem.find({});
    const order = await Order.find({});
    const preference = await Preference.find({});
    const restaurant = await Restaurant.find({});
    const review = await Review.find({});


    var temp = {
        users: users,
        address: address,
        menu: menu,
        menuitem: menuitem,
        order: order,
        preference: preference,
        restaurant: restaurant,
        review: review
    };

    try {
        res.send(temp);
        } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/adduser', async (req, res) => {
    const postUser = new User(req.body);

    try {
        await postUser.save();
        res.send(postUser);
        res.send("USER ADDED");
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/:name', async (req, res) => {
    try {
        const deleteUsers = await User.findOneAndRemove(req.name);

        if (!deleteUsers) res.status(404).send("No item found")
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
})
//different way of posting to database
// router.post("/",(req,res)=>{
//    const myTest = new User({
//        name: req.body.name,
//        tag: req.body.tag,
//    });
//    myTest
//    .save()
//    .then(result =>{
//        console.log(result);
//        res.send(result);
//    })
//    .catch(err=>{
//        console.log(err);
//    });
// });

//Routing to populate database
router.post("/createTables", function(req, res) {
    var address = new Address({
        houseNum: 626,
        street: "Sesame St.",
        city: "SGV",
        zipcode: 626626,
    });
    var preference = new Preference({foodCategories: ["East Western Cuisine", "Hot Pockets", "Paleo"],});
    var user = new User({
        id: "1234",
        username: "Sebastian",
        password: "password",
        phone: 626626626,
        address: address._id,
        preference: preference._id,
    });
    var menuitem = new MenuItem({
        name: "Fruit Roll-Up",
        price: 3.50,
    });
    var menuitem1 = new MenuItem({
        name: "Apple",
        price: 3.50,
    })
    var menu = new Menu({
        menuItems: [menuitem._id, menuitem1._id],
    });
    var resaddress = new Address({
        houseNum: 626,
        street: "Papa New Guinea St.",
        city: "Pacific",
        zipcode: 626626,
    });
    var respreferences = new Preference({
        foodCategories: ["Pizza", "Hoopla"],
    })
    var review = new Review({
        rating: 3,
        comment: "Decent place, no parking though",
    });
    var review1 = new Review({
        rating: 4,
        comment: "Nice place, to bad theres no parking",
    });
    var restaurant = new Restaurant({
        name: "Jungle Boys",
        address: resaddress._id,
        foodCategories: respreferences._id,
        menus: [menu._id],
        reviews: [review._id, review1._id],
    });
    var order = new Order({
        restaurants: [restaurant._id],
        orderItems: [menuitem._id, menuitem1._id],
        totalPrice: 7.00,
    })

    //Saving all to the database
    user.save(function(err) {
        if(err) handleError(err);
    });
    address.save(function(err) {
        if(err) handleError(err);
    });
    preference.save(function (err) {
        if(err) handleError(err);
    });
    menuitem.save(function(err){
        if(err) handleError(err);
    });
    menuitem1.save(function(err){
        if(err) handleError(err);
    });
    menu.save(function(err) {
        if(err) handleError(err);
    });
    resaddress.save(function(err){
        if(err) handleError(err);
    });
    respreferences.save(function(err){
        if(err) handleError(err);
    });
    restaurant.save(function(err){
        if(err) handleError(err);
    });
    review.save(function(err){
        if(err) handleError(err);
    });
    review1.save(function(err){
        if(err) handleError(err);
    });
    order.save(function(err0) {
        if(err) handleEror(err);
    });
    res.send("Created");
});

module.exports = router;
