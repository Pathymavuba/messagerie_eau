const Conversation =require("../model/conversation")
const express = require("express")
const router = express.Router()

router.createConversation("/conversation",async (req,res)=>{
    const {members} = req.body
    try {
        const oldCoversation = await Conversation.findOne({members:{$all:[...members]}})
        if(oldCoversation) return res.status(409).send('conversation exists')
        else{
    const conversation = await Conversation.create({
        members:[...members]
    })
    return res.status(201).json({msg:'conversation creee',data:conversation})
        }
        
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router;