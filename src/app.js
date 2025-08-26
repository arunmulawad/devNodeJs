const express = require("express")
const app = express()

app.get("/home", [(req, res, next) => {
    console.log("1")
    // res.send("welcome  1")
    next()
}, (req, res, next) => {
    console.log("2")
    // res.send("welcome  2")
    next()
}], [(req, res, next) => {

    console.log("3")
    next()
    // res.send("welcome  31 ")

}]
)
app.get("/home", (req, res, next) => {
    console.log("welcome  outside")
    res.send("welcome  outside")
    next()
})
app.listen(4000, () => {
    console.log("server running successfully at Port 4000")
})
