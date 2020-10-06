var express = require('express');
var router = express.Router();
const {check, validationResult} = require('express-validator');
var SqlString = require('sqlstring');
var con = require('../../db.js');
var createError = require('http-errors');

router.get('/:userId', function (req, res) {

    const sql = SqlString.format("SELECT *"
        + " FROM users"
        + " WHERE id= ?", [req.params.userId]);

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

router.get('/:userId/favorites', function (req, res) {

    const sql = SqlString.format("SELECT *"
        + " FROM workouts, favorites"
        + " WHERE favorites.userId = ? AND workouts.id=favorites.workoutId", [req.params.userId]);

    try {
        con.get().query(sql, function (err, result) {
            if (err) {
                throw err;
            }
            res.json(result);
        });
    }catch(e){
        console.error(e.message, e.name);
    }

});

router.post('/:userId/favorites', function (req, res) {

    const rb = req.body;
    const sql = SqlString.format("INSERT INTO favorites (userId,workoutId)"+
    "VALUES(?,?)", [req.params.userId, rb.workoutId]);

    try {
        con.get().query(sql, function (err, result) {
            if (err) {
                throw err;
            }
            res.json(result);
        });
    }catch(e){
        res.status(500).body("failed to get ... " + e).send({ error: e, message: e.message }); // 500
    }

});

module.exports = router;