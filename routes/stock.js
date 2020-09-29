const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('stock', {title: 'История прихода/расхода'})
});

module.exports = router;
