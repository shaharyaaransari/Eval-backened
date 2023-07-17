const jwt = require("jsonwebtoken")
  const auth = async(req,res,next)=>{
         const token = req.headers.authorization.split(" ")[1];

          try {
              if(!token){
                   res.status(400).send({msg:"token is not provided"})
              }
               const decoded = jwt.verify(token,"gullu")
                 req.userId = decoded.userId;
                  req.name = decoded.username;
                   console.log(decoded)
                   next()
          } catch (error) {
            res.status(400).send({error: error.message})
          }
  }
   


   module.exports = auth