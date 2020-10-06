var express = require('express');
var router = express.Router();

router.use('/workouts', require('./workouts'));
router.use('/users', require('./users'));

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'API v1 - workouts, users' });
});



module.exports = router;