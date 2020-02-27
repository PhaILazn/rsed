const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const testingRoutes = require("./routes/testingroutes");
const mongoose = require("mongoose");

//Connect to mongodb
const URI = 'mongodb+srv://Jay:boob@bigodobonhonkeros-jdryx.mongodb.net/OmNom_Foods?retryWrites=true&w=majority';
mongoose.connect(URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },() => console.log('Connected to database'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function() {
    console.log("Connection Successful!");
});
 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/testingroutes", testingRoutes);

app.listen(PORT,'0.0.0.0', () => console.log(`Example app listening on port ${PORT}!`));
