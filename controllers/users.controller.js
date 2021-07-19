const User = require('../models/User.model');
const Offer = require('../models/Offer.model');


// Render del perfil
module.exports.profile = (req,res, next) => {
    Offer.find({ author: req.user._id })
    .then(offers => {
        res.render('profile', { offers: offers })
    })
}

