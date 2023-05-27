const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['dealer', 'buyer'], required: true },
    createdAt: { type: Date, default: Date.now },
})

const UserModel = mongoose.model("User", UserSchema)


module.exports = {
    UserModel
}