const express = require("express")
const { connectDb } = require("./config/database")
const User = require("./models/user")

const app = express()
app.use(express.json())

app.post("/signup", async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.send("saved successfully")
    } catch (err) {
        res.status(400).send("An Error Occured" + err)


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
        const ALLOWED_UPDATES = ["age", "eMail", "skills"]
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
    const data = await User.findOne({ eMail: user.eMail })
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

