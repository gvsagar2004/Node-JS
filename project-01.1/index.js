const express = require("express");
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose"); 
const fs = require("fs");
const { stringify } = require("querystring");
const { type } = require("os");
const app = express();

const PORT = 8000;

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
//                      dir name to create   send data name 
const User = mongoose.model("user", userSchema);
// u can assume User as class


// connections                               creation name 
mongoose.connect("mongodb://127.0.0.1:27017/Project-01")
.then(()=> console.log("Mongoose Connected"))
.catch((err)=>console.log("Error", err));

// middleware -> plugins
app.use(express.urlencoded({extended : false}));

app.use((req, res, next)=>{
    fs.appendFile("log.txt", `\n${Date.now()}:${req.ip}:${req.method}: ${req.path}`,(err,data)=>{
        next();
    })
    // move to next routes 
})


// Routes
app.get("/users" ,async (req, res)=>{
    const alldbuser = await User.find({});
    const html = `
    <ul>
        ${alldbuser.map((user)=> `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

//Rest APi
app.route("/api/users/:id")
.get(async (req, res) =>{
    const user = await User.findById(req.params.id);
    return res.json(user);
})
.patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName: "changed"});
    return res.json({ status: "Success"});
})
.delete(async(req, res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.status(201).json({staus : "Deleted"});
});

app.post("/api/users", async (req, res) =>{
    const body = req.body;
   if(!body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.jobtitle
   ){
    return res.status(400).json({msg : "fill the fields"})
   }

//    user jo bhi create karega mujhe bhi return kardega 

   const result = await User.create({
    firstName : body.firstName,
    lastName : body.lastName,
    email: body.email,
    gender : body.gender,
    jobtitle : body.jobtitle
   }
);
   console.log("result", result);
   return res.status(201).json({msg : "success"});

})

app.get("/api/users", async (req, res)=>{
    const alldbuser = await User.find({});
    res.setHeader("X-myname", "Gunjan Vidya Sagar"); // custom headers 
    // Always add X to custum headers
    console.log(req.headers);
    return res.json(alldbuser);
})

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
