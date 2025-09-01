const express = require("express")
// const User = require("../models/user")
const { userAuth } = require("../Middlewares/auth")
const { validateProfileEdit } = require("../utils/validation")

const profileRouter = express.Router()
profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user
        res.send("cookie got" + user)
    }
    catch (error) {
        res.status(400).send("ERROR : " + error)
    }
})
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        validateProfileEdit(req)
        const user = req.user
        Object.keys(req.body).forEach(keys => user[keys] = req.body[keys])
        await user.save()
        res.json({
            message: `${user.firstName} , your profile updated successfully`,
            data: user
        })
    }
    catch (error) {
        res.status(400).send("ERROR : " + error)
    }
})
profileRouter.patch("/profile/forgotpassword", (req, res) => {
    try {

    } catch (error) {
        res.status(400).send("ERROR : " + error)

    }
})

module.exports = profileRouter