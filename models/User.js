const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
    },
    userName:{
        type:String,
        required:true,
        trim:true,
    },
    gender:{
        type:String,
        required:true,
        trim:true,
    },
    dateOfBirth:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },

},
{timestamps:true},);

module.exports = mongoose.model("User", userSchema);