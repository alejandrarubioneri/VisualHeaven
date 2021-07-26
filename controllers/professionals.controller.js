const User = require('../models/User.model');
const Offer = require('../models/Offer.model');


// Render de listado de professionals
module.exports.professionalsList = (req, res, next) => {
  User.find()
    .then(professionals => {
      let {
        professionalsSearch: search
      } = req.query;
      if (search) {
        search = search.toLowerCase()
      }
      let searchResults = professionals.filter(
        (professionalsSearch) =>
        professionalsSearch.fullName.toLowerCase().includes(search) ||
        professionalsSearch.occupation.map(c => c.toLowerCase()).includes(search)
      );
      if (!search) {
        searchResults = professionals
      }
      res.render('professionals', {
        professionals: searchResults
      });
    })
    .catch(next)
}

// Render de professionals/:id
module.exports.professionalDetail = (req, res, next) => {
  User.findById(req.params.id)
    .then((professional) => {
      Offer.find({
          author: req.params.id
        })
        .then((offers) => {
          res.render('professionalDetail', {
            professional,
            offers
          })
        })
        .catch((e) => console.log(e))
    })
    .catch((e) => console.log(e))
}