
const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    text:{type:string},
    image:String,
    fichier:String,
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    conversation :{type:mongoose.Schema.Types.ObjectId,ref:"conversation"}
},{timestamps:true})

module.exports = mongoose.model("message",messageSchema)