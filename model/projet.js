const mongoose = require('mongoose')

const projetSchema = mongoose.Schema({
    title:String,
    description:string
},{timestamps:true})

module.exports = mongoose.model('projet',projetSchema)