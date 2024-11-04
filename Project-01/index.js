const express = require("express");
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose"); 
const fs = require("fs");
const { stringify } = require("querystring");
const app = express();

const PORT = 8000;
// middleware -> plugins
app.use(express.urlencoded({extended : false}));

app.use((req, res, next)=>{
    console.log("hello from middleware 1");
    fs.appendFile("log.txt", `\n${Date.now()}:${req.ip}:${req.method}: ${req.path}`,(err,data)=>{
        next();
    })
    // move to next routes 
})
// app.use((req, res, next)=>{
//     console.log("hello from middleware 2");
//     return res.end("hey");
// });

// Routes
app.get("/users" ,(req, res)=>{
    const html = `
    <ul>
        ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

//Rest APi
app.route("/api/users/:id")
.get((req, res) =>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
.patch((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    // Update user data
    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;

    // Write updated users array back to MOCK_DATA.json
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users, null, 2));

    return res.json({ status: "Success", user: updatedUser });
})
.delete((req, res)=>{
    // delete user with id
    const id =Number(req.params.id);
    const userIndex = users.findIndex((user)=> user.id === id);
    // users.remove(users[userIndex]);
    users.splice(userIndex, 1);
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users),(err,data)=>{
        return res.json({status : "Success"});
    });
    
});

app.post("/api/users", (req, res) =>{
    // todo create a new user 

    // jo bhi hum frontend se data send karte haina 
    // const body = req.body;
    // console.log("Body", body); //undefined because express ko nhi pta kis tarah 
    // // ka data and kaise handle karna hoga 
    // // use middleware ->plugins
    // return res.json({status : "pending"});

    const body = req.body;
    
    users.push({...body, id : users.length +1});
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
        return res.json({status:" Success", id: users.length});
    })
})

app.get("/api/users", (req, res)=>{
    res.setHeader("X-myname", "Gunjan Vidya Sagar"); // custom headers 
    // Always add X to custum headers
    console.log(req.headers);
    return res.json(users);
})

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
