var express = require('express');
var router = express.Router();
const {check, validationResult} = require('express-validator');
var SqlString = require('sqlstring');
var con = require('../../db.js');

router.get('/', function (req, res) {

    const sql = SqlString.format("SELECT name"
        + " FROM users"
        + " WHERE id= ?", [req.query.userId]);

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

module.exports = router;