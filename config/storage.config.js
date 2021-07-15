const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const CloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage;

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

// Configuración de Cloudinary para utilizarlo en las rutas
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Ironhack/VisualHeaven', // Dónde se guardan las fotos
        allowedFormats: ['jpg', 'png', 'gif'], // Formatos permitidos
    }
})

module.exports = multer({ storage: storage })