const express = require("express");
const mongoose = require("mongoose");
const testingRoutes = require("./routes/testingRoute");

const app = express();

const PORT = process.env.PORT || 3000;
//Connect to mongodb
const URI = 'mongodb+srv://user:password@bigodobonhonkeros-jdryx.mongodb.net/OmNom_Foods?retryWrites=true&w=majority';
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

app.use("/", testingRoutes);
app.get("/poop",(req,res)=>res.send('Hello World'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
