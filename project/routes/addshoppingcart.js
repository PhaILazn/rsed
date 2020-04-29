const express = require("express");
const ShoppingCart = require("../models/shoppingcart");

const router = express.Router();

router.post("/addCart", (req, res) => {
    const exampleCart = new ShoppingCart({
        totalPrice : 0,
    })
    exampleCart
    .save()
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    });

    exampleCart.populate('items')
});

module.exports = router;