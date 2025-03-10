const mongoose = require("mongoose");


// Schema 
const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        required : true
    },
    lastName :{
        type : String
    },
    email :{
        type :String,
        unique : true,
        required : true
    },
    gender :{
        type : String
    },
    jobTitle :{
        type : String
    },
},{timestamps: true});

const User = mongoose.model("user", userSchema);

module.exports = User;