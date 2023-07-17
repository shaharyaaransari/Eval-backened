const express = require("express");
const auth = require("../middleware/auth");
const postModel = require("../models/postModel");
const router = express.Router();


router.get("/",auth, async(req,res)=>{
     const { search} = req.query
    try {
             const device = await RegExp(search,"i");
                  const postData= await postModel.find({device});
                     if(postData> 0){
                         res.status(400).send({msg:"you havn't post Yet"})
                     }
                         res.status(200).send(postData)
    } catch (error) {
           res.status(400).send({error:error.message})
    }
})

router.post("/add",auth, async(req,res)=>{
    const { title, body,device} = req.body
   try {
             const post = new postModel({
                  title,
                   body,
                   device,
                    creator: req.userId,
                      name: req.name
             })
                  console.log(post)
                    await post.save()
                   await post.populate("creator")
                     res.status(200).send({msg:"post ADD!!",post})
   } catch (error) {
          res.status(400).send({error:error.message})
   }
})
router.patch("/update/:id",auth, async(req,res)=>{
    
   try {
              const post = await postModel.findById(req.params.id)
                if(post.creator.toString()!==req.userId){
                    res.status(400).send({msg:"you are not allowed to update"})
                }
                   const user = await postModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
                   res.status(200).send(user)
   } catch (error) {
          res.status(400).send({error:error.message})
   }
})

router.delete("/delete/:id",auth, async(req,res)=>{
    
    try {
               const post = await postModel.findById(req.params.id)
                 if(post.creator.toString()!==req.userId){
                     res.status(400).send({msg:"you are not allowed to update"})
                 }
                    const user = await postModel.findByIdAndDelete(req.params.id)
                    res.status(200).send(user)
    } catch (error) {
           res.status(400).send({error:error.message})
    }
 })


 module.exports = router