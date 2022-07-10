const {validationResult} = require('express-validator');
const conn = require('../dbconnection/db').promise();
const verifyToken=require('./verifyToken')
let uniqid = require('uniqid'); 
var dateTime = require('node-datetime');
var dt = dateTime.create();

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
        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
        var date = new Date();
        const [row]=await conn.execute("SELECT `productid` FROM `Product` WHERE `productid`=?",[req.body.productid])
        if(row.length>0){
            await conn.execute(
                "INSERT INTO `order_details` VALUES (?,?,?,?,?)",
                [
                    uniqid(),
                    token.userid,
                    req.body.productid,
                    date.addDays(5),
                    false
    
                ]);
    
                return res.json({
                    msg:"Thank you for shoping"
                });
        }else{
            return res.status(400).json({
                msg:"Invalid product"
            });
        }
        
        
     
    }
    catch(err){
        next(err);
    }
}

