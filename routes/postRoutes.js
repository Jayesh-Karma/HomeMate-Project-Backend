const express = require("express");
const router = express.Router();


router.get('/', function(req, res) {
    res.send('Hello From post section');
});


module.exports = router;