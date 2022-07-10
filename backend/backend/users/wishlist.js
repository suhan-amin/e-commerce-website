const {validationResult} = require('express-validator');
const conn = require('../dbconnection/db').promise();
const verifyToken=require('./verifyToken')
let uniqid = require('uniqid'); 


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
      const[check]= await conn.execute("SELECT `id` FROM `cart` WHERE `producid`=? AND `userid`=?",[req.body.productid,token.userid])
        // console.log(check,check.length);
      if(check.length==0){
        await conn.execute(
            "INSERT INTO `cart` VALUES (?,?,?)",
            [
                uniqid(),
                req.body.productid,
                token.userid,

            ]);

            return res.json({
                msg:"Produced is added to your wishlist"
            });
        
      }
      else{
        return res.json({
            msg:"Produced is already added to your wishlist"
        }); 
      }
    }
    catch(err){
        next(err);
    }
}

