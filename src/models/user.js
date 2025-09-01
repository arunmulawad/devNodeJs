const { type } = require("express/lib/response")
const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("wrong email address " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Please Enter Strong Password " + value)
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Not a valid gender")
            }
        }
    },
    photo: {
        type: String,
        default: "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-man-profile-icon-silhouette-of-businessman-face-profile-vector-png-image_7058983.png"
    },
    about: {
        type: String,
        default: "Add Description"
    },
    dateOfBirth: {
        type: Date
    },
    skills: {
        type: []
    }
}, { timestamps: true })

userSchema.methods.getJWT = async function () {
    const user = this
    const token = await jwt.sign({ _id: user._id }, "dev.Discord@111", { expiresIn: "1h" })
    return token
}

userSchema.methods.validatePassword = async function (passwordByUser) {
    const user = this
    const isPasswordValid = await bcrypt.compare(passwordByUser, user.password)

    return isPasswordValid
}

module.exports = mongoose.model("User", userSchema)