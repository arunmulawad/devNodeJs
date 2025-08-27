const mongoose = require("mongoose")

const connectDb = async () => {
    await mongoose.connect(`mongodb+srv://arunmulawad145:arXEwcn9KFq2wAjm@dreamon5.fek8w41.mongodb.net/devDiscord`)
}

module.exports = { connectDb }