const express = require("express")
const app = express()

app.get("/home/:userId/:name/:pass", (req, res) => {
    const { userId, name, pass } = req.params
    const { product } = req.query
    console.log({ userId, name, pass, product })
    res.send({ name: "arun" })

})

app.listen(4000, () => {
    console.log("server running successfully at Port 4000")
})
