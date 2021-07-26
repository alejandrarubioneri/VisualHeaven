const router = require('express').Router();

const miscController = require('../controllers/misc.controller');
const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');
const offersController = require('../controllers/offers.controller');
const professionalsController = require('../controllers/professionals.controller');



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
router.get('/profile', authMiddleware.isAuthenticated, usersController.profile);

// Offers
router.get('/offers', offersController.offers);
router.post('/offers', upload.single('image'), offersController.doOffers);
router.get('/offers/:id', offersController.offersDetail);
router.delete('/offers/:id', offersController.offerDelete);
router.post('/offers/:id/apply', authMiddleware.isAuthenticated, offersController.apply);

// Professionals
router.get('/professionals', professionalsController.professionalsList);
router.get('/professionals/:id', professionalsController.professionalDetail);



module.exports = router;