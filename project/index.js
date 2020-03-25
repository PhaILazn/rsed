var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose')


var testingRoutes = require("./routes/testingRoute"),
    preferences = require("./routes/preferences"),
    addUserRoute = require("./routes/addUserRoute"),
    profile = require("./routes/profile"),
    editProfile = require("./routes/editProfile"),
    User = require('./models/user'),
    restaurantPop = require("./routes/restaurantPop"),
    indexAuth = require('./routes/indexAuth')

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
//Connect to mongodb
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@bigodobonhonkeros-jdryx.mongodb.net/OmNom_Foods?authSource=admin&replicaSet=xyz`;
mongoose.connect(URI,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => console.log('Connected to database'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log("Connection Successful!");
});

app.use(require('express-session')({
    secret: 'butthole',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   next(); 
});

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/public', express.static('./public'));

app.use("/testingRoute", testingRoutes);
app.use("/preferences", preferences);
app.use("/profile", profile);
app.use("/editProfile", editProfile);
app.use("/restaurantPop", restaurantPop);
app.use('/',indexAuth);

//added this for testing purposes
app.get("/secret",isLoggedIn, function(req,res){
    res.render('secret')
});
//testingggg

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/signin");
}


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
