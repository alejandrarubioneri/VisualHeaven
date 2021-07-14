const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_ROUNDS = 10;

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

// Encriptado de contraseñas
userSchema.pre('save', function(next) {
    if (this.isModified('password')) { // Comprobar si se ha modificado la password
        bcrypt.hash(this.password, SALT_ROUNDS) // Encriptar la contraseña pasando por las salt rounds
        .then((hash) => {
            this.password = hash
            next()
        })
    } else {
        next()
    }
})

// Comprobar que la contraseña que se está tecleando está en base de datos
userSchema.methods.checkPassword = function(passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;