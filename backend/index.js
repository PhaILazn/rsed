const express = require("express");
const mongoose = require("mongoose");
const testingRoutes = require("./routes/testingRoute");

const app = express();

const PORT = process.env.PORT || 3000;
//Connect to mongodb
<<<<<<< HEAD:backend/index.js
const URI = 'mongodb+srv://Jay:boob@bigodobonhonkeros-jdryx.mongodb.net/OmNom_Foods?retryWrites=true&w=majority';
=======
const URI = 'mongodb+srv://user:password@bigodobonhonkeros-jdryx.mongodb.net/OmNom_Foods?retryWrites=true&w=majority';
>>>>>>> fa934b8b01d52b151f6c09fbd2fb4713fb9e9fad:Backend_files/index.js
mongoose.connect(URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },() => console.log('Connected to database'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:')); 
db.once('open', function() {
    console.log("Connection Successful!");
});
 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

<<<<<<< HEAD:backend/index.js
app.use("/getall", testingRoutes);
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/testing",(req,res)=>res.send("This is a testing to see if server is connected..."));

=======
app.use("/", testingRoutes);
app.get("/poop",(req,res)=>res.send('Hello World'));
>>>>>>> fa934b8b01d52b151f6c09fbd2fb4713fb9e9fad:Backend_files/index.js

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
