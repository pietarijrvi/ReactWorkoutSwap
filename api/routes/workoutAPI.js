var express = require('express');
var router = express.Router();
const data = require('./testJson.json');
const { check, validationResult } = require('express-validator');
var SqlString = require('sqlstring');
var con = require('../db.js');

router.get('/test', function(req, res, next) {
    res.send('node käytössä');
});

router.get('/json', function(req, res, next) {
    //res.writeHead(200, {'Content-Type': 'application/json'});
    //res.end(JSON.stringify(data));
    res.json(data);
});

router.post('/workouts/', [
    // workoutID must be an int
    check('workoutID').isInt(),
    check('title').isLength({min:5, max:10}),
    check('description').isLength({min:5, max:10}),
    check('duration').isInt({min:1, max:180}),
    check('equipmentRequired').isBoolean(),
    // userID must be an int
    check('createdBy').isInt()

    //createDate luodaan sql kanssa
    //rating=?? votes lähtee nollasta luodaan sql kanssa
],function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("post err");
        return res.status(422).json({ errors: errors.array() });
    }
    console.log("post ok");
    res.send("Success - workout added (not really, just testing)");

    /*
    res.header("Access-Control-Allow-Origin", "*");
    console.log("Receiving score - POST");
    const rb = req.body;
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;

    const scoreSQL = SqlString.format("INSERT INTO game1 (game1.score, game1.user_id, game1.datetime) VALUES(?,?,?)",[rb.score, rb.userID, dateTime]);

    con.get().query(scoreSQL, function (err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end("Success - score added");
    });
    */
});

module.exports = router;