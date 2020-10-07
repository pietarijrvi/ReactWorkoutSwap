const express = require('express');
const router = express.Router();
const { authJwt } = require("../../middleware");
const {check, validationResult} = require('express-validator');
const SqlString = require('sqlstring');
const connect = require('../../dbConnection.js');


router.get('/:userId/profile',[authJwt.verifyToken],function (req, res) {

    const sql = SqlString.format("SELECT *"
        + " FROM users"
        + " WHERE id= ?", [req.params.userId]);

    connect(res, sql);

});

router.get('/:userId/favorites',[authJwt.verifyToken], function (req, res) {

    const sql = SqlString.format("SELECT *"
        + " FROM workouts, favorites"
        + " WHERE favorites.userId = ? AND workouts.id=favorites.workoutId", [req.params.userId]);

    connect(res, sql);

});

router.post('/:userId/favorites', [authJwt.verifyToken],[
        check('userId').isInt(),
        check('workoutId').isInt()
    ],
    function (req, res) {
        // Finds the validation errors in this request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("post err");
            return res.status(422).json({errors: errors.array()});
        }

        const rb = req.body;
        const sql = SqlString.format("INSERT INTO favorites (userId,workoutId)" +
            "VALUES(?,?)", [req.params.userId, rb.workoutId]);

        connect(res, sql);
    });

module.exports = router;