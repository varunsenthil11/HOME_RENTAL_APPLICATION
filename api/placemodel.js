const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:String,
    address:String,
    addphotos:[String],
    description:String,
    perks:[String],
    extrainfo:String,
    checkin:String,
    checkout:String,
    maxguests:Number,
    price:Number
})
module.exports=  mongoose.model("Place",userSchema)