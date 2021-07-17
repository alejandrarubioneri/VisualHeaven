const router = require('express').Router();

const miscController = require('../controllers/misc.controller');
const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');

const authMiddleware = require('../middlewares/auth.middleware');


// Subida de imágenes a Cloudinary
const upload = require('../config/storage.config');


// Home
router.get('/', miscController.home);

// Register
router.get('/register', authMiddleware.isNotAuthenticated, authController.register);
router.post('/register', upload.single('image'), authController.doRegister); // Utilizamos el middleware de multer para subir la foto 

// Login
router.get('/login', authMiddleware.isNotAuthenticated, authController.login);
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin);

// Logout
router.post('/logout', authMiddleware.isAuthenticated, authController.logout);

// Profile
router.get('/profile', authMiddleware.isAuthenticated, usersController.profile)

module.exports = router;