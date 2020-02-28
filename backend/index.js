const express = require("express");
const mongoose = require("mongoose");
const testingRoutes = require("./routes/testingRoute");

const app = express();

const PORT = process.env.PORT || 3000;
//Connect to mongodb
const URI = 'mongodb+srv://<user>:<pass>@bigodobonhonkeros-jdryx.mongodb.net/OmNom_Foods?retryWrites=true&w=majority';

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

app.use('/public',express.static('public'));

app.use("/testingRoute", testingRoutes);
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/index.html", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
//signin page will route to adding a username
app.get("/signin.html", (req, res) => {
    res.sendFile(__dirname + "/signin.html");
    app.use('/adduser', testingRoutes);
});

app.get("/signup.html", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});
app.get("/testing",(req,res)=>res.send("This is a testing to see if server is connected..."));


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
