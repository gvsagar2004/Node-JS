
const mongoose = require("mongoose");

async function connectmongodb (url){
    return mongoose.connect(url)
    .then(()=> console.log("Mongoose Connected"))
    .catch((err)=>console.log("Error", err));
    
}
module.exports = {
    connectmongodb,
}