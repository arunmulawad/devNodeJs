const express = require("express")
const { connectDb } = require("./config/database")
const cookieParser = require("cookie-parser")

const app = express()

// Fetch JSON Body from API
app.use(express.json())
// Fetch Cookie from Request
app.use(cookieParser())

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)


connectDb().then((res) => {
    console.log("connected successfully to database")
    app.listen(4000, () => {
        console.log("server running successfully at Port 4000")
    })
}).catch((err) => {
    console.log(err)
})

