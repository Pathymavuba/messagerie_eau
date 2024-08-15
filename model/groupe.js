const mongoose = require('mongoose')

const groupeSchema = mongoose.Schema({
    title:{type:String,required:true},
   description:String,
    members:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}]
},{timestamps:true})

module.exports = mongoose.model('groupe',groupeSchema)