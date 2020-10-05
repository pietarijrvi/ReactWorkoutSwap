var express = require('express');
var router = express.Router();

router.use('/workouts', require('./workouts'));

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'API v1' });
});



module.exports = router;