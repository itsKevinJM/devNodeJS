const express = require('express');
const router = express.Router();
const Pagans = require('../Pagans');

router.get('/user', (req, res) => {
    res.send("user route");
    res.end()
})

module.exports = router;