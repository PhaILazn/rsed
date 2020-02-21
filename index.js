const express = require('express')
const app = express()
const port = 3000
var mongoose = require('mongoose'),
    User = require("./models/user"),
    Address = require("./models/address");

//Connect to mongodb server
mongoose.connect('mongodb+srv://admin:password@bigodobonhonkeros-jdryx.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function() {
    console.log("Connection Successful!");
    User.create({id: "1234", username: "Sebastian", password: "NonDisabledPeopleParkingInDisabledParkingSpots"});   
}); 
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));