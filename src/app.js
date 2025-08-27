const express = require("express")
const { connectDb } = require("./config/database")
const User = require("./models/user")
const { validationSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt")

const app = express()
app.use(express.json())

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
        const isUseExists = await User.findOne({ emailId: emailId })
        if (!isUseExists) {
            throw new Error("Invalid Credentials")
        }
        const validatePassword = await bcrypt.compare(password, isUseExists.password)
        if (validatePassword) {

            // create Token
            res.cookie("Token", "123123324536657fgf")
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
app.get("/profile", async (req, res) => {
    const { emailId, password } = req.body
    try {

        const token = req.cookies
        console.log(token)
    }
    catch (err) {
        res.status(400).send("ERROR : " + err)
    }
})
app.delete("/user", async (req, res) => {
    // const userId = req.body.userId
    // const data = await User.findByIdAndDelete(userId)  OR
    const user = req.body
    try {
        const data = await User.findOneAndDelete({ age: user.age })
        res.send("deleted successfully")
    } catch (err) {
        res.status(400).send("An Error Occured" + err)
    }
})

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId
    const userData = req.body

    try {
        const ALLOWED_UPDATES = ["age", "emailId", "skills"]
        const dataUpdate = Object.keys(userData).every((f) => ALLOWED_UPDATES.includes(f))
        if (!dataUpdate) {
            throw new Error("Cannot Be Update")
        }
        if (userData?.skills?.length > 10) {
            throw new Error("Cannot Be added more than 10")
        }
        const data = await User.findByIdAndUpdate(userId, userData, { returnDocument: "after", runValidators: true })
        // const data = await User.findOneAndUpdate({ firstName: "arunn" }, user, { returnDocument: "after" })
        res.send("Updated successfully" + data)
    } catch (err) {
        res.status(400).send("Update Failed " + err)
    }
})

app.get("/user", async (req, res) => {
    const user = req.body
    const data = await User.findOne({ emailId: user.emailId })
    try {
        res.send(data)
    } catch (err) {
        res.status(400).send("An Error Occured" + err)
    }
})
app.get("/feed", async (req, res) => {
    const user = req.body
    const data = await User.find({})
    try {
        res.send(data)
    } catch (err) {
        res.status(400).send("An Error Occured" + err)
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

