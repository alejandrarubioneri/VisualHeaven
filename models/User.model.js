const mongoose = require('mongoose');

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [EMAIL_PATTERN, 'email is invalid']
        },
        password: {
            type: String,
            required: [true, 'password is required'],
            minLength: [8, 'password is invalid']
        },
        image: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;