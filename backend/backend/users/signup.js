const {validationResult} = require('express-validator');
const conn = require('../dbconnection/db').promise();
var uniqid = require('uniqid'); 
const md5 = require('md5')


module.exports = async (req,res,next) =>{

   const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{
        const [row] = await conn.execute(
            "SELECT `userid` FROM `User` WHERE `email`=?",[req.body.email]);
        if (row.length !== 0) {
            return res.status(422).json({
                message: "User already exists",
            });
        }
       const [rows] = await conn.execute('INSERT INTO `User`(`userid`, `name`, `email`, `address`, `password`) VALUES(?,?,?,?,?)',[
        uniqid(),
        req.body.name,
        req.body.email,
        req.body.address,
        md5(req.body.password)
    ]);

    if (rows.affectedRows === 1) {
        return res.status(201).json({
            message: "The user has been successfully inserted.",
        });
    }
       
    }
    catch(err){
        next(err);
    }
}

