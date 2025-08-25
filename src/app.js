const express = require("express")
const app= express()

app.use("/login",(req,res)=>{
    res.send("welcome to servers")
})
app.use("/home/user",(req,res)=>{
    res.send("welcome to User")
})
app.use("/home",(req,res)=>{
    res.send("welcome to Dashboard")
})
app.use("/",(req,res)=>{
    res.send("welcome to Default")
})
app.listen(4000,()=>{
    console.log("server running successfully at Port 4000")
})