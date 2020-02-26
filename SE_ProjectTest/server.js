const express = require('express');
const mongoose = require('mongoose');
const testingRoute = require('./routes/testingRoute');
const app = express();

const PORT = process.env.PORT || 3000;
const URI = 'mongodb+srv://user:password@bigodobonhonkeros-jdryx.mongodb.net/OmNom_Foods?retryWrites=true&w=majority';

mongoose.connect(URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },() => console.log('Connected to database'));


app.use("/testingRoute", testingRoute);

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/', (req,res)=>{
    res.send()
})


app.listen(PORT, () => console.log(`listening on port ${PORT}`));