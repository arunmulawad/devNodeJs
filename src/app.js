const express = require("express")
const app = express()

app.get("/user", (req, res, next) => {
    throw new Error("aaaa")
    res.send("logged on")
})

app.use("/", (err, req, res, next) => {
    console.log("err", err)
    if (err) {
        res.status(500).send("An Error Occured")
    }
})


app.listen(4000, () => {
    console.log("server running successfully at Port 4000")
})
