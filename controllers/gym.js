const knex = require("../db/knex.js");

module.exports = {
  index: function(req, res) {
    let message = {message: req.session.message};
    req.session.message = null;
    res.render('pages/gym', {passedInData: "xyz"});
  },

}
