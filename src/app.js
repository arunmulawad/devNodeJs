const express = require("express")
const { authCheck, adminCheck } = require("./Middlewares/auth")
const app = express()

app.get("/user/login", (req, res) => {
    res.send("logged on")

})
app.get("/user/get", authCheck, (req, res) => {
    res.send("user get")
})
app.get("/user/post", authCheck, (req, res) => {
    res.send("user post")
})
app.get("/admin/getData", adminCheck, (req, res) => {
    res.send("admin data")
})


app.listen(4000, () => {
    console.log("server running successfully at Port 4000")
})
