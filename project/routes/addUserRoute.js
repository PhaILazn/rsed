const User = require('../models/user');
const express = require('express');

const router =  express.Router();
const app = express();
router.post('/', async (req, res) => {
    const postUser = new User(req.body);
    
    try {
        await postUser.save();
        var objectID = postUser._id;
        res.redirect(`../${objectID}`);
    } catch (err) {
        res.status(500).send(err);
    }
});



module.exports = router;