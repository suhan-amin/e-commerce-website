const conn = require('../dbconnection/db').promise();


module.exports=async (req, res)=> {
    const bearerHeader = req.header("Authorization");
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];

      if (!bearer[1] || bearer[0].toLowerCase()!="bearer"){ return {"msg":"Invalid token","status":false}}

      
      try{
        const [row] = await conn.execute("SELECT userid FROM `User` WHERE userid=?",[bearerToken]);
        if (row.length > 0) {
        return {"userid":row[0].userid,"status":false}
      } 
      }catch(err){
        return {"msg":err,"status":false}
        // console.log(err)
      }
  
    } else {
      return {"msg":"Token is require","status":false}
    }
  }
