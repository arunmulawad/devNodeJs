const express = require("express")
const { validationSignUpData } = require("../utils/validation")
const bcrypt = require("bcrypt")
const User = require("../models/user")

const authRouter = express.Router()
authRouter.post("/signup", async (req, res) => {
    try {
        // Validation Data
        validationSignUpData(req)
        const { firstName, lastName, emailId, password } = req.body

        // Encryption
        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        })
        await user.save()
        res.send("saved successfully")
    } catch (err) {
        res.status(400).send("ERROR : " + err)

    }

})
authRouter.post("/login", async (req, res) => {
    const { emailId, password } = req.body
    try {
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid Credentials")
        }
        const validatePassword = await user.validatePassword(password)
        if (validatePassword) {
            // create JWT Token
            const token = await user.getJWT()

            // send Token into COOKIES
            res.cookie("token", token, { expires: new Date(Date.now() + 1 * 3600000) })
            res.send("Logged In successfully ")
        } else {
            throw new Error("Invalid Credentials")
        }
    }
    catch (err) {
        res.status(400).send("ERROR : " + err)
    }
})
authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) })
        .send("Logged out successfully")
})
module.exports = authRouter