const express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport");
    

const testingRoutes = require("./routes/testingRoute");
const preferences = require("./routes/preferences");
const app = express();
const addUserRoute = require("./routes/addUserRoute");

require('dotenv').config();
const PORT = process.env.PORT || 3000;
//Connect to mongodb
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@bigodobonhonkeros-jdryx.mongodb.net/OmNom_Foods?retryWrites=true&w=majority`;

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

app.set('view engine', 'ejs');
 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/public',express.static('public'));

app.use("/testingRoute", testingRoutes);
app.use("/preferences", preferences);

app.use('/adduser',addUserRoute);

app.get("/", (req, res) => {
    res.render('home');
});

//signin page will route to adding a username
app.get("/signin.html", (req, res) => {
    res.sendFile(__dirname + "/signin.html");
});

app.get("/signup.html", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.get(`/:id`,(req,res)=>{
    res.sendFile(__dirname + "/profile.html");
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
