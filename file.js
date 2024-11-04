const fs = require("fs");

// Sync...         dir          content
// fs.writeFileSync("./test.txt", "hey there");

// Async --> should also give call back func
// fs.writeFile("./test.txt", "hello world from Async" ,(err)=>{});

// const result = fs.readFileSync("./test.txt", "utf-8");
// console.log(result);

// Async read doesnot return
// fs.readFile("./contacts.txt", "utf-8", (err, result) =>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(result);
//     }
// });

// fs.appendFileSync("./test.txt" ,`${Date.now()} hey there\n`);


// fs.cpSync("./test.txt", "./copy.txt");

// fs.unlinkSync("./copy.txt");

// console.log(fs.statSync("./test.txt"));

console.log("1");
// Blocking...
const res = fs.readFileSync("./contacts.txt", "utf-8");
console.log(res);
console.log("2");

console.log("1");
// Non - blocking...
fs.readFile("./contacts.txt", "utf-8", (err,res) =>{
    if(err){
                console.log(err);
    }
    else{
                console.log(res);
    }
});
console.log("2");