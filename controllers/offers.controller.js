const User = require('../models/User.model');
const Offer = require('../models/Offer.model');


// Render de offers
module.exports.offers = (req,res, next) => {
    Offer.find({ author: req.user._id })
    .then(offers => {
        res.render('offers', { offers: offers })
    })
}