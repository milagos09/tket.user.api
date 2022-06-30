const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, "First Name is required"] },
    lastName: { type: String, required: [true, "Last Name is required"] },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    dateRegistered: { type: Date, default: new Date() },
});

module.exports = mongoose.model("User", userSchema);
