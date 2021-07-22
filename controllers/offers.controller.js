const User = require('../models/User.model');
const Offer = require('../models/Offer.model');


// Render de offers
module.exports.offers = (req, res, next) => {
      Offer.find()
        .populate('author')
        .then(offers => {
          res.render('offers', {
            offers: offers
          });
        })
        .catch(next)
  }   

  // Render del detalle de las ofertas 
  module.exports.offersDetail = (req, res, next) => {
    Offer.findById(req.params.id)
    .populate('author')
    .then(offer => {
      res.render('offerDetail', {
        offer: offer
      });
    })
    .catch(next)
  }