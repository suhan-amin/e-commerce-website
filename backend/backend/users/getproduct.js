const {validationResult} = require('express-validator');
const conn = require('../dbconnection/db').promise();

module.exports = async (req,res,next) =>{

    const errors = validationResult(req);
    const token=verifyToken(req,res)
    if(!token.status){
        return res.status(422).json({
            message: token.msg,
        });
    }
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
try{
    c
    const [row]= await conn.execute(
        "SELECT * FROM `Product` WHERE `productid`=?",
        [req.body.productid]
        );

        return res.json({
            data:row
        });
    
 
}
catch(err){
    next(err);
}
}
