const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User.model');

// Serializar usuario
passport.serializeUser((user, next) => {
    next(null, user.id);
})

// Deserializar usuario
passport.deserializeUser((id, next) => {
    User.findById(id)
        .then((user => next(null, user)))
        .catch(next)
})

// Middleware de passport para indicar cómo funciona la estrategia local
passport.use('local-auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, next) => {
    User.findOne({ email:email }) // Asegurarnos de que no hay errores con el usuario
    .then((user) => { // Si no existe ese usuario
        if (!user) {
            next(null, false, { error: 'email or password is incorrect' })
        } else { // Si existe ese usuario
            return user.checkPassword(password)
            .then((match) => {
                if (match) { // Si la contraseña coincide, se guarda al usuario en sesión
                    next(null, user)
                } else { // Si no, se le manda el error
                    next(null, false, { error: 'email or password is incorrect' })
                }
            })
        }
    })
    .catch(next)
}))