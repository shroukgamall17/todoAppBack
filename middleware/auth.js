var jwt = require("jsonwebtoken");
let {promisify}=require('util');

async function auth(req, res, next) {
  let {authorization}=req.headers
  
  if(!authorization){
  
    return  res.status(401).json({ message: "you must login first"})
  }
  try{let decoded = await promisify(jwt.verify)(authorization,process.env.SECRET)
      console.log(decoded);
      req.id = decoded.data.id;
  next();
  }
  catch(err)
  {
      console.log(err);
      return  res.status(401).json({ message: "unauthorized"})
  }
   }
  









   function restrictTo(...roles){
  return(req, res, next)=>{

    if(!roles.includes(req.role)){
      return  res.status(403).json({ message: "you dont have permission to"})

    }
    next()
  }

   }
module.exports = { auth };
