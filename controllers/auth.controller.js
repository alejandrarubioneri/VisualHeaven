const User = require('../models/User.model');
const mongoose = require('mongoose');
const passport = require('passport');

// Render de register
module.exports.register = (req,res, next) => {
    res.render('auth/register')
}

// Registro de usuario con validación
module.exports.doRegister = (req, res, next) => {
    User.findOne({ email: req.body.email }) // Comprobar que no hay más usuarios con ese mail 
    .then((user) => {
        if (!user) { // Si no lo encuentra, lo crea
            if (req.file) { // Si hay foto, la guarda
                req.body.image = req.file.path
            }

            User.create(req.body)
            .then(() => {
                res.redirect('/')
            })
            .catch(e => { // Detectar si es error de mongoose y volver a renderizar la vista
                if (e instanceof mongoose.Error.ValidationError) {
                    res.render('auth/register', { user: req.body, errors: e.errors })
                } else {
                    next(e)
                }
            })
        } else { // Sí existía este usuario en la db
            res.render('auth/register', { user: req.body, errors: { email: 'This email is already used' } })
        }
    })
    .catch(e => next(e))
}

// Render de Login
module.exports.login = (req, res, next) => {
    res.render('auth/login')
}

module.exports.doLogin = (req, res, next) => {
    passport.authenticate('local-auth', (error, user, validations) => {
        if (error) { // Si ha habido un error
            next(error)
        } else if (!user) { // Si no hay usuario
            res.render('auth/login', { user: req.body, errorMessage: validations.error })
        } else { // Si hay usuario
            req.login(user, (loginErr) => { // Ejecuta el serializador, logea al usuario y maneja errores si los ha habido
                if (loginErr) {
                    next(loginErr)
                } else {
                    res.redirect('/profile')
                }
            }) 
        }
    })(req, res, next)
}

// Logout
module.exports.logout = (req, res, next) => {
    req.logout()
    res.redirect('/login')
}