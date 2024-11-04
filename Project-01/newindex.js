const express = require("express");
const { connectmongodb } = require("./connection");
const userRouter = require("./routes/user")
const { logReqRes } = require("./middleware/index");
const app = express();

const PORT = 8000;

// connections 
connectmongodb("mongodb://127.0.0.1:27017/Project-01").then(()=>console.log("MongoDB connected"));

// middleware -> plugins
app.use(express.urlencoded({extended : false}));
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
