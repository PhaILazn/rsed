const User = require('../models/user');
const express = require('express');

const router =  express.Router();

router.post('/', async (req, res) => {
    const postUser = new User(req.body);

    try {
        await postUser.save();
        res.sendFile(__dirname + "../profile.html");
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;