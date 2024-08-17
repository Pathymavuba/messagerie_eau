const User = require("../model/user")
const express = require("express")
const  router = express.Router()
const bcrypte = require("bcryptjs")
const jwt = require('jsonwebtoken')
const auth =require("../middleware/auth")

//login
router.post("/auth/login",async function(req,res){
    const {tel,pwd} = req.body
    try {
       const user = await User.findOne({phoneNumber:tel}) 
       if(!user) return res.status(404).send('password or phoneNumber incorrect')
       const valid  = bcrypte(pwd,user.password)
      if(!valid) return res.status(404).send('password or phoneNumber incorrect')
      
     const payload = {
        id : user._id,
        name: user.name,
        lastName : user.lastName,
        phoneNumber:user.phoneNumber
     }

     const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1d"})
     await User.updateOne({_id:user._id},{token})

     delete user.token

     return res.status(200).json({statut:true,msg:"user connected succefully",data:user,token:token})
       

        
    } catch (error) {
        return res.status(500).send(error)
    }
})

//deconnection
router.get('/auth/deconnected',auth, async (req,res)=>{
    try {
        await User.updateOne({_id:req.user.id},{token:null})
        return res.status(200).send('user deconnected')
        
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports =router 