var express = require('express');
var router = express.Router();
const data = require('../testJson.json');
const { check, validationResult } = require('express-validator');
var SqlString = require('sqlstring');
var con = require('../../db.js');

router.get('/test', function(req, res) {
    res.send('node käytössä');
});

router.get('/', function(req, res) {
    //res.json(data);


    const limit=50;

    //WorkoutId, CreateDate, Title, Description, Duration, EquipmentRequired, Rating, CreatedBy
    const sql = SqlString.format("SELECT *"
        + " FROM workouts"
        + " ORDER BY workouts.rating"
        + " LIMIT ?", [limit]);

    con.get().query(sql, function (err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
        res.json(result);
    });

});

router.post('/', [
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
    console.log("Receiving score - POST");
    const dateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const createdBy = rb.createdBy;
    const rating = 0;

    const workoutSQL = SqlString.format("INSERT INTO game1 (Workouts.WorkoutId, Workouts.CreateDate, Workouts.Title, Workouts.Description, Workouts.Duration, Workouts.EquipmentRequired, Workouts.Rating, Workouts.CreatedBy) VALUES(?,?,?)",[rb.workoutId, dateTime, rb.title, rb.description, rb.duration, rb.equipmentRequired, rating, createdBy]);

    con.get().query(workoutSQL, function (err, result) {
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