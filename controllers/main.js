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
  },

  pokedex: function(req, res) {
    req.session.error = null;
    req.session.message = null;
    knex('species')
      .then(species=> {
        res.render('pages/pokedex', {species: species});
      })
      .catch(err => {
        console.log(err);
        req.session.message = err.toString();
        req.session.error = "Could not load pokemon page.";
        req.session.save(err => {
          res.redirect('/error');
        });
      });
  }

}
