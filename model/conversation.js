const mongoose = require("mongoose")

const conversatioSchema = mongoose.Schema({
    members:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
    rieciver:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
})

module.exports = mongoose.model("conversation",conversatioSchema)