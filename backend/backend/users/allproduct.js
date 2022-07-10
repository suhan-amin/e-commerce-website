const {validationResult} = require('express-validator');
const conn = require('../dbconnection/db').promise();

module.exports = async (req,res,next) =>{

    const errors = validationResult(req);

try{

    const [row]= await conn.execute(
        "SELECT * FROM `Product` "
        );

        return res.json({
            data:row
        });
    
 
}
catch(err){
    next(err);
}
}
