const authCheck = (req, res, next) => {
    const isAuthValid = "token" === "token"
    console.log("auth is called")
    if (!isAuthValid) {
        res.status(401).send("UnAuthorized user")
    } else {
        next()
    }
}
const adminCheck = (req, res, next) => {
    const isAuthValid = "token" === "token"
    console.log("admin auth is called")
    if (!isAuthValid) {
        res.status(401).send("UnAuthorized user")
    } else {
        next()
    }
}
module.exports = {
    authCheck, adminCheck
}