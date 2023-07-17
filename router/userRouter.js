const express = require("express");
const userModel = require("../models/UserModel");
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklistModel");
router.get("/", (req, res) => {
    res.send("welcome to HomePage!")
})

router.post("/register", async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await userModel.findOne({ email })
        const RegrexPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
        if (!RegrexPass.test(password)) {
            return res.status(400).send({ msg: "please choose another password" })
        }
        if (existingUser) {
            return res.status(400).send({ msg: "User already exist" })
        }

        bcrypt.hash(password, 8, async (err, hash) => {
            if (err) {
                res.status(400).send({ err: err.message })
            } else {
                const user = await userModel.create({ ...req.body, password: hash })
                res.status(200).send({ msg: "user register successfully!!", register: user })
            }
        })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, decoded) => {
                if (decoded) {
                    const token = jwt.sign({ userId: user._id, username: user.name }, "gullu", { expiresIn: "7d" })
                    res.status(200).send({ msg: "Login successfully!!", token: token })
                } else {
                    res.status(400).send({ msg: "wrong credentails!!" })
                }
            })
        } else {
            res.status(400).send({ msg: "user does not exist" })
        }

    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

router.get("/logout",async(req,res)=>{
     const token = req.headers.authorization.split(" ")[1];
    try { 
    token && (await blacklistModel.updateMany({},{$push:{blacklist:[token]}}))
       res.status(200).send({msg:"user logout successfully!!"})
            
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})


module.exports = router