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
            trim: true, // quitar espacios
            lowercase: true,
            match: [EMAIL_PATTERN, 'email is invalid']
        },
        password: {
            type: String,
            required: [true, 'password is required'],
            minLength: [8, 'password is invalid']
        },
        fullName: {
            type: String,
            required: [true, 'a full name is required']
        },
        image: {
            type: String
        },
        biography: {
            type: String,
            required: true,
            maxLength: [500, 'write about you in 500 characters']
        },
        occupation: {
            type: [String],
            enum: [
                'Producer',
                'Video Editor',
                'Studio Engineers',
                'TV',
                'Cinema',
                'Director',
                'Camera',
                'Grip And Electric',
                'Hair And Makeup',
                'Locations',
                'Music',
                'Post Production',
                'Sound',
                'VFX',
                'Special FX',
                'Screenwriting',
                'Stunts',
                'Photographer',
                'Other'
            ]
        },
        role: {
            type: String,
            enum: ['ADMIN', 'USER'],
            default: 'USER'
        },
    },
    {
        timestamps: true
    }
);

// Encriptado de contraseñas
userSchema.pre('save', function(next) {
    // Para comprobar si el usuario es ADMIN o no
    if (this.email === process.env.ADMIN_EMAIL) {
        this.role = 'ADMIN'
    } else {
        this.role = 'USER'
    }

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