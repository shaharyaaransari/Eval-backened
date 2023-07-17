const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
     title: {type:String,require:true},
      body: {type:String,require:true},
     device: {type:String,require:true},
       creator: {type:mongoose.Schema.Types.ObjectId,ref:"Users" ,require:true},
        name : {type: String,require:true}
})


  const postModel = mongoose.model("Posts",PostSchema)

  module.exports = postModel;