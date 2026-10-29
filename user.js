const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6],
        trim: true
    },
    adoptedAnimals: {
        type: [String],
        default: [],
    },
    role: {
        type: String, 
        enum: ['user', 'admin'],
        default: 'user'
    },

},
{ timestamps: true }
);

const User = mongoose.model("User", UserSchema, "users");
module.exports = User;