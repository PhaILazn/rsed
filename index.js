const express = require('express')
const app = express()
const port = 3000
var mongoose = require('mongoose'),
    Address = require("./models/address"),
    Review = require("./models/review"),
    MenuItem = require("./models/menuitem"),
    Menu = require("./models/menu"),
    Restaurant = require("./models/restaurant"),
    Order = require("./models/order"),
    User = require("./models/user");

    

//Connect to mongodb server
mongoose.connect('mongodb+srv://admin:password@bigodobonhonkeros-jdryx.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function() {
    console.log("Connection Successful!");
    //User.create({id: "1234", username: "Sebastian", password: "NonDisabledPeopleParkingInDisabledParkingSpots"});   
}); 
app.post("/", function(req, res) {
    res.send("Post");
});
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
