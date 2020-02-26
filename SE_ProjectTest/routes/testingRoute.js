const express = require('express');
const User = require('../model/user.js');
const Address = require('../model/address.js');
// const Driver = require('../model/driver.js');
const Menu = require('../model/menu');
const menuItem = require('../model/menuitem.js');
const Order = require('../model/order');
const Preference = require('../model/preference');
const Restaurant = require('../model/restaurant');
const Review = require('../model/review');


const router = express.Router();

router.get("/", async (req, res) => {
    const users = await User.find({});
    const address = await Address.find({});
    // const driver= await Driver.find({});
    const menu = await Menu.find({});
    const menuitem = await menuItem.find({});
    const order = await Order.find({});
    const preference = await Preference.find({});
    const restaurant = await Restaurant.find({});
    const review = await Review.find({});


    var temp = {
        users: users,
        address: address,
        // driver: driver,
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

router.post('/', async (req, res) => {
    const postUser = new User(req.body);

    try {
        await postUser.save();
        res.send(postUser);
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

module.exports = router;