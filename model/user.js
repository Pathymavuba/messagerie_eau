const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:string
    },
    lastName:{
        type:string
    },
    role:string
},{timestamps:true})

module.exports = mongoose.model('user',userSchema)