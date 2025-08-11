const express = require("express")
const app= express()

app.use("/login",(req,res)=>{
    res.send("welecome to servers")
})
app.use("/home",(req,res)=>{
    res.send("welecome to Dashboard")
})

app.listen(4000,()=>{
    console.log("server running successfully at Port 4000")
})