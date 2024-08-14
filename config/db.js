require("dotenv").config();
const mongoose = require('mongoose');


mongoose.connect(process.env.DB_LINK)
.then(()=>console.log("connected to database successfully"))
.catch((e)=>console.log(e))

module.exports = mongoose