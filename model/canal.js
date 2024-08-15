const mongoose = require('mongoose')

const canalSchema = mongoose.Schema({
    title:String,
    projet:{type:mongoose.Schema.Types.ObjectId,ref:"projet"},
    members:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}]
},{timestamps:true})

module.exports = mongoose.model('canal',canalSchema)