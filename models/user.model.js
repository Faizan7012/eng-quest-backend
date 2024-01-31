const { Schema, model } = require("mongoose");

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'VIEW_ALL',
    }
}, { timestamp: true });

const userModel = model("user", userSchema);

module.exports = userModel