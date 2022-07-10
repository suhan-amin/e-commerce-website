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

        const [row]=await conn.execute(
            "select p.name,p.price,p.image,p.rating,o.delivery_date,o.status FROM Product p, order_details o  where p.productid=o.productid and o.userid=?",
            [token.userid]);

            return res.json({
                data:row
            });
        
     
    }
    catch(err){
        next(err);
    }
}

