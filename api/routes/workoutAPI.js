var express = require('express');
var router = express.Router();
const data = require('./testJson.json');

router.get('/test', function(req, res, next) {
    res.send('node käytössä');
});

router.get('/json', function(req, res, next) {
    //res.writeHead(200, {'Content-Type': 'application/json'});
    //res.end(JSON.stringify(data));
    res.json(data);
});

module.exports = router;