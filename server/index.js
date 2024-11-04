const http = require("http");
const fs = require("fs");
const url = require("url");
// const myServer = http.createServer((req, res) =>{
    
//     console.log(req.headers);
//     res.end("hello From the server");
// })

// const myServer = http.createServer((req, res) =>{
//     // jab koi server pe ayega log file create hogi and append karega log file 
//     if(req.url == "/favicon.ico")return res.end();
//     const log = `${Date.now()}: ${req.url} new req rec\n`;
    
//     const myurl = url.parse(req.url, true);
//     console.log(myurl);
//     fs.appendFile("log.text", log, (err, data) =>{
//         switch (myurl.pathname) {
//             case "/":
//                 res.end("Homepage");
//                 break;
//             case "/about":
//                 res.end("About sec");
//                 break;
//             case "/search":
//                 const search = myurl.query.search_query;
//                 res.end("here are your result for " + search);
//                 break;
//             default:
//                 res.end("404 Error");
//                 break;
//         }
//         // res.end("hello From the server");
//     })
//     // console.log(req.headers);
    
// })

// myServer.listen(8000, ()=>{
//     console.log("Server Started");
// })



// const myServer = http.createServer((req, res) =>{
//     // jab koi server pe ayega log file create hogi and append karega log file 
//     if(req.url == "/favicon.ico")return res.end();
//     const log = `${Date.now()}: ${req.method} :${req.url} new req rec\n`;
    
//     const myurl = url.parse(req.url, true);
//     fs.appendFile("log.text", log, (err, data) =>{
//         switch (myurl.pathname) {
//             case "/":
//                 if(req.method === 'GET')res.end("Homepage");
//                 break;
//             case "/about":
//                 res.end("About sec");
//                 break;
//             case "/search":
//                 const search = myurl.query.search_query;
//                 res.end("here are your result for " + search);
//                 break;
//             case "/signup":
//                 if(req.method === "GET")res.end("this is signup fom");
//                 else if(req.method === "POST"){
//                     // DB query me data daala do or msg yeh de do
//                     res.end("FOm submitted");
//                 }
//             default:
//                 res.end("404 Error");
//                 break;
//         }
//         // res.end("hello From the server");
//     })
//     // console.log(req.headers);
    
// })

// myServer.listen(8000, ()=>{
//     console.log("Server Started");
// })




function handler(req,res){
    if(req.url == "/favicon.ico")return res.end();
    const log = `${Date.now()}: ${req.method} :${req.url} new req rec\n`;
    
    const myurl = url.parse(req.url, true);
    fs.appendFile("log.text", log, (err, data) =>{
        switch (myurl.pathname) {
            case "/":
                if(req.method === 'GET')res.end("Homepage");
                break;
            case "/about":
                res.end("About sec");
                break;
            case "/search":
                const search = myurl.query.search_query;
                res.end("here are your result for " + search);
                break;
            case "/signup":
                if(req.method === "GET")res.end("this is signup fom");
                else if(req.method === "POST"){
                    // DB query me data daala do or msg yeh de do
                    res.end("FOm submitted");
                }
            default:
                res.end("404 Error");
                break;
        }
        // res.end("hello From the server");
    })
}
// const myServer = http.createServer(handler);
// // same hi ha baat bas funtion ko hi handler bna diya 
// myServer.listen(8000, ()=>{
//     console.log("Server Started");
// })

// aisi ek lib chaiye jo myhandler likh de or manage karsaake itne baadi get post req
// routes ko handle karna easy hojata ha
// internally http method hi use ho rha h 
const express = require("express");
// app basically handler function ha 
const app =express();
// jab iss path pe req aayegi ye run karjayega 
app.get('/', (req,res)=>{
    return res.send("Hello from Home page");
})
// jab iss pe ayegi tab yeh run karega
app.get('/about', (req,res)=>{
    return res.send("hello from About page" +"hey" +req.query.name);
})

// const myServer = http.createServer(app);
// // same hi ha baat bas funtion ko hi handler bna diya 
// myServer.listen(8000, ()=>{
//     console.log("Server Started");
// })
app.listen(8000,()=> console.log("Server Startd.."))