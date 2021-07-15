const router = require('express').Router();
const miscController = require('../controllers/misc.controller');
const authController = require('../controllers/auth.controller');

// Subida de imágenes a Cloudinary
const upload = require('../config/storage.config');


// Home
router.get('/', miscController.home);

// Register
router.get('/register', authController.register);
router.post('/register', upload.single('image'), authController.doRegister); // Utilizamos el middleware de multer para subir la foto 

// Login
router.get('/login', authController.login);
router.post('/login', authController.doLogin);

// Logout
router.post('/logout', authController.logout);


module.exports = router;