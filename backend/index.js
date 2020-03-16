const express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport");
    LocalStrategy = require('passport-local');
    passportLocalMongoose = require('passport-local-mongoose');
    

const testingRoutes = require("./routes/testingRoute");
const preferences = require("./routes/preferences");
const addUserRoute = require("./routes/addUserRoute");
const User = require('./models/user');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
//Connect to mongodb
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@bigodobonhonkeros-jdryx.mongodb.net/OmNom_Foods?retryWrites=true&w=majority`;

mongoose.connect(URI,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },() => console.log('Connected to database'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:')); 
db.once('open', function() {
    console.log("Connection Successful!");
});

app.use(require('express-session')({
    secret: 'butthole',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

app.set('view engine', 'ejs');
 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/public',express.static('public'));

app.use("/testingRoute", testingRoutes);
app.use("/preferences", preferences);
app.use('/adduser',addUserRoute);



app.get("/", (req, res) => {
    res.render('index');
});

//signin page will route to adding a username
app.get("/signin", (req, res) => {
    res.render('signin');
});
//route to signup page
app.get("/signup", (req, res) => {
    res.render('signup');
});
app.post('/signup', function(req,res){
    const postUser = new User(req.body);
    User.register(new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone
    }),req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req,res,function(){
            res.redirect('index');
        })
    });
});


//route to profile specific to id
app.get(`/:id`,(req,res)=>{
    res.render('profile');
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
