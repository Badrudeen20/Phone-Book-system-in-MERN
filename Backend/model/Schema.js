const mongoose = require('mongoose')


const ContactSchema = mongoose.Schema({
     name:{type:String},
     number:{type:Number},
     add_at:{type:Date,default:Date.now}
})

module.exports = mongoose.model("Contact",ContactSchema)