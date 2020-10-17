const express = require('express');
const router = express.Router();
const {authJwt} = require("../../middleware");
const {check, validationResult} = require('express-validator');
const SqlString = require('sqlstring');
const connect = require('../../dbConnection.js');

/**
 * @api {get} v1/workouts/ Request all workouts (best rating first)
 * @apiGroup Workouts
 * @apiVersion 1.0.0
 *
 * @apiParam {String} title workout title (or part of it)
 * @apiParam {Boolean} equipment true:required.
 * @apiParam {Number} limit result limit.
 *
 * @apiSuccess {Number} id id
 * @apiSuccess {Datetime} createDate  datetime of the workout creation.
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
router.get('/', function (req, res) {

    const limit = req.query.limit;
    const equipment = req.query.equipment;

    let sql;
    if (req.query.title && req.query.title !== "") {
        sql = SqlString.format("SELECT *"
            + " FROM workouts"
            + " WHERE title LIKE ? AND equipmentRequired = ?"
            + " ORDER BY workouts.rating"
            + " LIMIT ?", ['%' + req.query.title + '%', equipment, parseInt(limit)]);
    } else {
        sql = SqlString.format("SELECT *"
            + " FROM workouts"
            + " WHERE equipmentRequired = ?"
            + " ORDER BY workouts.rating"
            + " LIMIT ?", [equipment, parseInt(limit)]);

    }
    console.log(sql);

    connect(res, sql);

});

/**
 * @api {get} v1/workouts/:id Request all workouts created by a user
 * @apiGroup Workouts
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {Number} id id
 * @apiSuccess {Datetime} createDate  datetime of the workout creation.
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
router.get('/:userId', function (req, res) {
    const sql = SqlString.format("SELECT *"
        + " FROM workouts"
        + " WHERE createdBy= ?", [req.params.userId]);
    connect(res, sql);
});

/**
 * @api {post} v1/workouts/ Post new workout
 * @apiGroup Workouts
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} title workout title
 * @apiParam {Number} description workout description
 * @apiParam {Number} duration workout duration in minutes
 * @apiParam {Number} equipmentRequired true: equipment required
 * @apiParam {Number} createdBy userID of the user creating the workout
 * @apiParam {JSON} JWTokens
 */
router.post('/', [authJwt.verifyToken], [
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

], function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    const rb = req.body;

    const dateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const createdBy = rb.createdBy;
    const rating = 0;

    const sql = SqlString.format("INSERT INTO workouts (workouts.createDate, workouts.title, workouts.description, workouts.duration, workouts.equipmentRequired, workouts.Rating, workouts.createdBy) " +
        "VALUES(?,?,?,?,?,?,?)", [dateTime, rb.title, rb.description, rb.duration, rb.equipmentRequired, rating, createdBy]);

    connect(res, sql);
});

module.exports = router;