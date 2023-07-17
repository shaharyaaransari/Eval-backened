 const mongoose = require("mongoose")

   const userSechema = mongoose.Schema({
        name: {type:String,require:true},
         email: {type:String,require:true},
        gender: {type:String,require:true},
         password: {type:String,require:true}
   })


     const userModel = mongoose.model("Users",userSechema)

     module.exports = userModel;