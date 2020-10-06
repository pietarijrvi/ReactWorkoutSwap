var express = require('express');
var router = express.Router();
const {check, validationResult} = require('express-validator');
var SqlString = require('sqlstring');
var con = require('../../db.js');


router.get('/', function (req, res) {

    const limit = req.query.limit;
    const name = req.query.name;
    const equipment = req.query.equipment;

    //WorkoutId, CreateDate, Title, Description, Duration, EquipmentRequired, Rating, CreatedBy
    const sql = SqlString.format("SELECT *"
        + " FROM workouts"
        + " ORDER BY workouts.rating"
        + " LIMIT ?", [limit]);

    try {
        con.get().query(sql, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);
            res.json(result);
        });
    }catch(e){
        console.error(e.message, e.name);
    }

});

router.post('/', [
    check('title').isLength({min: 5, max: 20}),
    check('description').isLength({min: 5, max: 1000}),
    check('duration').isInt({min: 1, max: 180}),
    check('equipmentRequired').isBoolean(),
    // userID must be an int
    check('createdBy').isInt()

    //createDate luodaan sql kanssa
    //rating=?? votes lähtee nollasta luodaan sql kanssa
], function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("post err");
        return res.status(422).json({errors: errors.array()});
    }

    const rb = req.body;

    console.log("Receiving score - POST");
    const dateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const createdBy = rb.createdBy;
    const rating = 0;

    const workoutSQL = SqlString.format("INSERT INTO workouts (workouts.createDate, workouts.title, workouts.description, workouts.duration, workouts.equipmentRequired, workouts.Rating, workouts.createdBy) " +
        "VALUES(?,?,?,?,?,?,?)", [dateTime, rb.title, rb.description, rb.duration, rb.equipmentRequired, rating, createdBy]);

    try {
        con.get().query(workoutSQL, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end("Success - workout added");
        });
    }catch(e){
        console.error(e.message, e.name);
    }
});

module.exports = router;