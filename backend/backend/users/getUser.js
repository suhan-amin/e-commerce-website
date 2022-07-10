const {validationResult} = require('express-validator');
const conn = require('../dbconnection/db').promise();
const verifyToken=require('./verifyToken')

module.exports = async (req,res,next) =>{
    
    const errors = validationResult(req);
    const token= await verifyToken(req,res)
    if(token.status){
        return res.status(422).json({
            message: token.msg,
        });
    }
   
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

try{
    
    const [row]= await conn.execute(
        "select name,email,address from  User where userid=?",
        [token.userid]
        );
        
        return res.json({
            data:row
        });
    
 
}
catch(err){
    console.log(err)
    next(err);
}
}
