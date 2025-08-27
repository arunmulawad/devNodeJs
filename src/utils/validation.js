const validator = require("validator")


const validationSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body
    if (!firstName || !lastName) {
        throw new Error("Name Should be Valid")
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Please Enter Valid E-mail")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please Enter Strong Password ")

    }
}
module.exports = { validationSignUpData }