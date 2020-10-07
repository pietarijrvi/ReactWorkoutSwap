const express = require('express');
const router = express.Router();
const { authJwt } = require("../../middleware");
const {check, validationResult} = require('express-validator');
const SqlString = require('sqlstring');
const connect = require('../../dbConnection.js');


router.get('/', function (req, res) {

    const limit = req.query.limit;
    let name = "";
    if (req.query.name)
        name = req.query.name;
    const equipment = req.query.equipment;

    //WorkoutId, CreateDate, Title, Description, Duration, EquipmentRequired, Rating, CreatedBy
    const sql = SqlString.format("SELECT *"
        + " FROM workouts"
        //+ " WHERE description LIKE '%?%'" //AND equipmentRequired = ?"
        + " ORDER BY workouts.rating"
        + " LIMIT ?", [parseInt(limit)]);

    connect(res, sql);

});

router.get('/:userId', function (req, res) {
    const sql = SqlString.format("SELECT *"
        + " FROM workouts"
        + " WHERE id= ?", [req.params.userId]);
    connect(res, sql);
});

router.post('/', [authJwt.verifyToken],[
    check('title')
        .isString().withMessage('Only letters and digits allowed in title.')
        .trim()
        .isLength({min: 5, max: 20}).withMessage('Title must be 5-20 characters'),
    check('description')
        .isString().withMessage('Only letters and digits allowed in title.')
        .trim()
        .isLength({min: 5, max: 1000}).withMessage('description must be 10-1000 characters'),
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

    const sql = SqlString.format("INSERT INTO workouts (workouts.createDate, workouts.title, workouts.description, workouts.duration, workouts.equipmentRequired, workouts.Rating, workouts.createdBy) " +
        "VALUES(?,?,?,?,?,?,?)", [dateTime, rb.title, rb.description, rb.duration, rb.equipmentRequired, rating, createdBy]);

    connect(res, sql);
});

module.exports = router;