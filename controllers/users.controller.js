const User = require('../models/User.model');
const Offer = require('../models/Offer.model');


// Render del perfil
// module.exports.profile = (req,res, next) => {
//     Offer.find({ author: req.user._id })
//     .then(offers => {
//         res.render('profile', { offers: offers })
//     })
// }

module.exports.profile = (req, res, next) => {
    function findProjectsAndRender(user) {
      Project.find({ owner: userId ? userId : req.user._id })
        .populate("owner")
        .then(projects => {
          const data = {
            projects: projects
          }
      
          if (user) {
            data.currentUser = user
          }
  
          res.render('profile', data);
        })
        .catch(next)
    }
  
    const { userId } = req.params;
  
    if (userId) {
      User.findById(userId)
        .then(user => {
          findProjectsAndRender(user)
        })
    } else {
      findProjectsAndRender()
    }
  }