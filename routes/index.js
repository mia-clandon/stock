const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Учёт расхода и прихода запчастей'});
});

module.exports = router;

