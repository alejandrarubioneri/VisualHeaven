const User = require('../models/User.model');
const Offer = require('../models/Offer.model');
const Application = require('../models/Application.model');


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

// Formulario creación de oferta
module.exports.doOffers = (req, res, next) => {
  console.log(req)  
  Offer.create(req.body)
      .then((offer) => {
        res.redirect('/offers');
      })
      .catch((e) => res.render('error'));
  };


  // Render del detalle de las ofertas con botón de apply
  module.exports.offersDetail = (req, res, next) => {
    Offer.findById(req.params.id)
    .populate('author')
    .then(offer => {
      return Application.findOne({ user: req.user._id, offer: req.params.id})
      .then(application => {
        const applied = !!application; //Para convertir application a booleano
        res.render('offerDetail', {
          offer: offer, applied: applied
        });
      })
    })
    .catch(next)
  }

  // Aplicar a las ofertas
  module.exports.apply = (req, res, next) => {
    Application.findOneAndDelete({ user: req.user._id, offer: req.params.id}) // Saber si ese usuario ya ha aplicado para borrar el botón
      .then(apply => {
        if (apply) {
          res.json({ deleted: !! application }) // Borrar el botón
        }
      })
  }