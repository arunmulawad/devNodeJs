const express = require("express")
const app = express()
const { connectDb } = require("./config/database")
const User = require("./models/user")

app.post("/user/signup", async (req, res) => {
    const user = new User({
        firstName: "rahul",
        lastName: "Mulawad",
        eMail: "rahul.m@gmail.com",
        age: "wd"
    })
    try {
        await user.save()
        res.send("saved successfully")
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

