const User = require('../models/User.model');
const Offer = require('../models/Offer.model');


// Render de listado de professionals
module.exports.professionalsList = (req, res, next) => {
  User.find()
        .then(professionals => {
          res.render('professionals', {
            professionals: professionals
          });
        })
        .catch(next)
  } 

// Render de professionals/:id
 module.exports.professionalDetail = (req, res, next) => {
   User.findById(req.params.id)
   .then((professional) => {
     Offer.find({ author: req.params.id })
     .then((offers) => {
      res.render('professionalDetail', { professional, offers })
     })
     .catch((e) => console.log(e))
   })
   .catch((e) => console.log(e))
  }