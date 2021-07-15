const session = require('express-session');
const MongoStore = require('connect-mongo');
const { db } = require('./constants')

// Configuración del middleware de session
module.exports = (app) => {
    app.use(
        session({
            secret: process.env.SESSION_SECRET || 'change me', // Proteger la sesión
            resave: true, // Guardar info cuando se producen cambios en la sesión
            saveUninitialized: false, // Para que no guarde la sesión si todavía no hay contenido en req.session
            cookie: {
                sameSite: 'lax',
                httpOnly: true, // Para que las cookies solo funcionen en HTTP
                maxAge: 1000 * 60 * 60 * 24 // Cuánto dura la sesión (1 día)
            },
            store: MongoStore.create({ // Crear una instancia de MongoStore
                mongoUrl: process.env.MONGODB_URI || db
            }) 
        })
    )
}