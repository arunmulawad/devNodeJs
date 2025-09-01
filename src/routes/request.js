const express = require("express")
const { userAuth } = require("../Middlewares/auth")

const requestRouter = express.Router()
requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
    try {
        const { firstName } = req.user
        res.send(firstName + " is sent the connection request")

    } catch (error) {
        res.status(400).send("ERROR : " + error)

    }
})
module.exports = requestRouter