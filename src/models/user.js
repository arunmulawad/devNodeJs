const { type } = require("express/lib/response")
const mongoose = require("mongoose")
const validator = require("validator")

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
    eMail: {
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
    phote: {
        type: String,
        default: "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-man-profile-icon-silhouette-of-businessman-face-profile-vector-png-image_7058983.png"
    },
    dateOfBirth: {
        type: Date
    },
    isIndian: {
        type: Boolean
    },
    skills: {
        type: []
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)