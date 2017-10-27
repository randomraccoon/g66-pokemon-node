const knex = require("../db/knex.js");

module.exports = {
  error: function(req, res) {
    let error = {error: req.session.error, message:req.session.message};
    req.session.error = null;
    req.session.message = null;
    res.render('pages/error', error);
  },

  '404': function(req, res) {
    req.session.error = null;
    req.session.message = null;
    res.render('pages/404');
  }

}
