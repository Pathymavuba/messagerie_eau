const mongoose = require('mongoose')

const projetSchema = mongoose.Schema({
    title:String,
    description:String
},{timestamps:true})

module.exports = mongoose.model('projet',projetSchema)