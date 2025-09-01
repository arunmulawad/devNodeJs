const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = async (req, res, next) => {
    try {
        const { token } = await req.cookies
        if (!token) {
            throw new Error("Invalid Token !!!")
        }
        const decodedObj = jwt.verify(token, "dev.Discord@111")
        const { _id } = decodedObj
        const user = await User.findById(_id)
        if (!user) {
            throw new Error("User Not Found")
        }
        req.user = user
        next()
    } catch (err) {
        res.status(400).send("ERROR : " + err)
    }
}
module.exports = {
    userAuth
}