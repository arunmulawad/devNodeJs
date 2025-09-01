const express = require("express")
const { connectDb } = require("./config/database")
const User = require("./models/user")
const { validationSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const { userAuth } = require("./Middlewares/auth")

const app = express()

// Fetch JSON Body from API
app.use(express.json())

// Fetch Cookie from Request
app.use(cookieParser())

app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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
// PROFILE
app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user
        res.send("cookie got" + user)
    }
    catch (err) {
        res.status(400).send("ERROR : " + err)
    }
})
app.post("/sendConnectionRequest", userAuth, (req, res) => {
    try {
        const { firstName } = req.user
        res.send(firstName + " is sent the connection request")

    } catch (error) {
        res.status(400).send("ERROR : " + error)

    }
})

connectDb().then((res) => {
    console.log("connected successfully to database")
    app.listen(4000, () => {
        console.log("server running successfully at Port 4000")
    })
}).catch((err) => {
    console.log(err)
})

