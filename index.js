const express = require('express')
const app = express()
const port = 3000
var mongoose = require('mongoose'),
    Address = require("./models/address"),
    Preference = require("./models/preference");
    Review = require("./models/review"),
    MenuItem = require("./models/menuitem"),
    Menu = require("./models/menu"),
    Restaurant = require("./models/restaurant"),
    Order = require("./models/order"),
    User = require("./models/user");

    

//Connect to mongodb server
mongoose.connect("mongodb+srv://penny:jabubbly@bigodobonhonkeros-jdryx.mongodb.net/OmNom_Foods?retryWrites=true&w=majority", {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function() {
    console.log("Connection Successful!");
    //User.create({id: "1234", username: "Sebastian", password: "NonDisabledPeopleParkingInDisabledParkingSpots"});   
}); 

//Routing to populate database
app.post("/createTables", function(req, res) {
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
    res.send("Creatd");
});

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
