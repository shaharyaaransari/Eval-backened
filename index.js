const express = require("express")
 const mongoose = require("mongoose");
  const app = express();
    const UserRouter =require("./router/userRouter")
     const cors = require("cors")
      const postRouter = require("./router/postRouter")
     require("dotenv").config()
   app.use(express.json())
   app.use(cors())
     const connect = async ()=>{
            try {
                 await mongoose.connect(process.env.MONGO_URL)
                  console.log("connected")
            } catch (error) {
                 console.log(error)
            }
     }
     app.use("/user",UserRouter)
       app.use("/post",postRouter);


   app.listen(process.env.PORT,()=>{
          connect();
     console.log("server running");
   })

