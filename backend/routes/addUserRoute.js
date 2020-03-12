const User = require('../models/user');

const router =  express.Router();

router.post('/adduser', async (req, res) => {
    const postUser = new User(req.body);

    try {
        await postUser.save();
        res.send(postUser);
        res.send("USER ADDED");
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;