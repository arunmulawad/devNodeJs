const express = require("express")
const app= express()

app.get("/home",(req,res)=>{
    res.send({name:"arun"})
})
app.patch("/home",(req,res)=>{
    res.send("this is patch")
})
app.post("/home",(req,res)=>{
    res.send("this is post")
})
app.delete("/home",(req,res)=>{
    res.send("this is delete")
})

// app.use("/",(req,res)=>{
//     res.send("welcome to Default")
// })
app.listen(4000,()=>{
    console.log("server running successfully at Port 4000")
})