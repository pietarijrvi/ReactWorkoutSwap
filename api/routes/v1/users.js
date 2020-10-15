const express = require('express');
const router = express.Router();
const {authJwt} = require("../../middleware");
const {check, validationResult} = require('express-validator');
const SqlString = require('sqlstring');
const connect = require('../../dbConnection.js');


/**
 * @api {get} v1/users/:userId/profile Request user's profile information
 * @apiGroup Users
 *
 * @apiParam {Number} userId userId
 * @apiParam {JSON} JWToken users can access just their own information
 *
 * @apiSuccess {Number} id userId
 * @apiSuccess {String} username username.
 * @apiSuccess {String} email user's email.
 * @apiSuccess {Datetime} createdAt creation datetime
 * @apiSuccess {Datetime} updatedAt update datetime
 */
router.get('/:userId/profile', [authJwt.verifyToken], function (req, res) {

    const sql = SqlString.format("SELECT id, username, email, createdAt, updatedAt"
        + " FROM users"
        + " WHERE id= ?", [req.params.userId]);

    connect(res, sql);

});

/**
 * @api {get} v1/users/:userId/favorites Request list of user's favorite workouts
 * @apiGroup Users
 *
 * @apiParam {Number} userId userId
 * @apiParam {JSON} JWToken users can access just their own information
 *
 * @apiSuccess {Number} id id
 * @apiSuccess {Datetime} createDate datetime of the workout creation.
 * @apiSuccess {String} title Workout title.
 * @apiSuccess {String} description Workout description.
 * @apiSuccess {Number} duration id
 * @apiSuccess {Number} equipmentRequired id
 * @apiSuccess {Number} rating workout popularity (likes)
 * @apiSuccess {Number} createdBy Id of the user that created the workout
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
            "id": 18,
            "createDate": "2020-10-04T15",
            "title": "testing",
            "description": "testing",
            "duration": 3,
            "equipmentRequired": 0,
            "rating": 0,
            "createdBy": 1
        }
 */
router.get('/:userId/favorites', [authJwt.verifyToken], function (req, res) {

    const sql = SqlString.format("SELECT *"
        + " FROM workouts, favorites"
        + " WHERE favorites.userId = ? AND workouts.id=favorites.workoutId", [req.params.userId]);

    connect(res, sql);

});

/**
 * @api {post} v1/users/:userId/favorites/:workoutId Add workout to user's favorites
 * @apiGroup Users
 *
 * @apiParam {Number} userId user's own userId
 * @apiParam {Number} workoutId workoutId of the added workout
 * @apiParam {JSON} JWToken users add workouts to their own favorites
 */
router.post('/:userId/favorites', [authJwt.verifyToken], [
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
            " VALUES(?,?)", [req.params.userId, rb.workoutId]);

        connect(res, sql);
    });

/**
 * @api {delete} v1/users/:userId/favorites/:workoutId Remove workout from user's favorites
 * @apiGroup Users
 *
 * @apiParam {Number} userId user's own userId
 * @apiParam {Number} workoutId workoutId
 * @apiParam {JSON} JWToken users remove their own favorites
 */
router.delete('/:userId/favorites/:workoutId', [authJwt.verifyToken], [
        check('userId').isInt(),
        check('workoutId').isInt()
    ],
    function (req, res) {
        try {

            // Finds the validation errors in this request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log("post err");
                return res.status(422).json({errors: errors.array()});
            }

            console.log(req);
            const sql = SqlString.format("DELETE FROM favorites WHERE userId=? AND workoutId=?",
                [req.params.userId, req.params.workoutId]);
            connect(res, sql);
        } catch (e) {
            console.log(e);
        }
    });

module.exports = router;