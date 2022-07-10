const {validationResult} = require('express-validator');
const conn = require('../dbconnection/db').promise();
const md5 = require('md5')



module.exports = async (req,res,next) =>{

   const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{
       console.log(req.body);

        const [row] = await conn.execute(
            "SELECT `userid` FROM `User` WHERE `email`=? and password=?",
            [
            req.body.email,
            md5(req.body.password)
            ]
          );

        if (row.length === 0) {
            return res.status(422).json({
                message: "Invalid email/Password",
            });
        }
        console.log(row);
        return res.json({
            token:row[0].userid
        });

    }
    catch(err){
        next(err);
    }
}


