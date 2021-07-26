const User = require('../models/User.model');
const Offer = require('../models/Offer.model');
const Application = require('../models/Application.model');


// Render de offers con formulario de búsqueda
module.exports.offers = (req, res, next) => {
  Offer.find()
    .populate('author')
    .then(offers => {
      let {
        offersSearch: search
      } = req.query;
      if (search) {
        search = search.toLowerCase()
      }
      let searchResults = offers.filter(
        (offersSearch) =>
        offersSearch.title.toLowerCase().includes(search) ||
        offersSearch.description.toLowerCase().includes(search) ||
        offersSearch.categories.map(c => c.toLowerCase()).includes(search) ||
        offersSearch.author.fullName.toLowerCase().includes(search)
      );
      if (!search) {
        searchResults = offers
      }
      res.render('offers', {
        offers: searchResults,
      });
    })
    .catch(next)
}

// Formulario creación de oferta
module.exports.doOffers = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path
  }
  if (req.user) {
    req.body.author = req.user._id
  }
  console.log(req.body)
  Offer.create(req.body)
    .then((offer) => {
      res.redirect('/offers');
    })
    .catch((e) => {
      res.render('error')
    });
};


// Render del detalle de las ofertas con botón de apply
module.exports.offersDetail = (req, res, next) => {
  Offer.findById(req.params.id)
    .populate('author')
    .then(offer => {
      if (req.user) {
        return Application.findOne({
            user: req.user._id,
            offer: req.params.id
          })
          .then(application => {
            const applied = !!application; //Para convertir application a booleano
            const isNotAuthor = offer.author._id.toString() !== req.user._id.toString()
            res.render('offerDetail', {
              offer: offer,
              applied: applied,
              isNotAuthor: isNotAuthor
            });
          })
      } else {
        res.render('offerDetail', {
          offer: offer,
          applied: false,
          isNotAuthor: false
        });
      }
    })
    .catch(next)
}

// Aplicar a las ofertas
module.exports.apply = (req, res, next) => {
  Application.findOneAndDelete({
      user: req.user._id,
      offer: req.params.id
    }) // Saber si ese usuario ya ha aplicado para borrar el botón
    .then(apply => {
      if (!apply) {
        return Application.create({
            user: req.user._id,
            offer: req.params.id
          })
          .then(() => res.json({
            applied: false
          }))
      } else {
        res.json({
          applied: true // Borrar el botón
        })
      }
    })
    .catch(next)
}

// Borrar ofertas
module.exports.offerDelete = (req, res, next) => {
  Offer.findByIdAndDelete(req.params.id)
  .then(result => {
    if (!result) {
      res.json({ deleted: false })
    } else {
      res.json({ deleted: true })
    }
  })
  .catch(next)
}