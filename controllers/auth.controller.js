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