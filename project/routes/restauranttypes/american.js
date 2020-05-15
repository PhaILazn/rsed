const express = require("express");

const router = express.Router();

router.get("/", function(req, res) {
  res.render("restauranttypes/american");
});

module.exports = router;
