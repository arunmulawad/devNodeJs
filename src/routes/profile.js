const express = require("express")
// const User = require("../models/user")
const { userAuth } = require("../Middlewares/auth")

const profileRouter = express.Router()
profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user
        res.send("cookie got" + user)
    }
    catch (err) {
        res.status(400).send("ERROR : " + err)
    }
})

module.exports = profileRouter