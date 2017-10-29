const knex = require("../db/knex.js");

module.exports = {
  index: function(req, res) {
    let returnObj = {
      error: req.session.error,
      message: req.session.message,
      p1: req.session.p1,
      p2: req.session.p2
    };
    req.session.error = null;
    req.session.message = null;
    knex.raw(`
      SELECT p.*, s.name AS species, s.image_name, t.name AS trainer FROM pokemon AS p
      JOIN trainers AS t ON (t.id = p.trainer_id)
      JOIN species AS s ON (s.id = p.species_id)
      `)
      .then(resultObj=>{
        returnObj.pokemon = resultObj.rows;
        let players = returnObj.pokemon.filter(p=>p.id == returnObj.p1 || p.id == returnObj.p2);
        players = players.concat(['null, null']);
        players.length = 2;
        console.log(players);
        returnObj.players = players;
        res.render('pages/gym', returnObj);
      })

  },

  addPost: function(req, res) {
    res.redirect('/gym/add/' + req.body.id);
  },

  add: function(req, res) {
    let id = req.params.id;
    if (!req.session.p1 || req.session.p1 === id) {
      req.session.p1 = id;
    } else if (!req.session.p2 || req.session.p1 === id) {
      req.session.p2 = id;
    } else {
      req.session.save(err => {
        res.redirect('/pokemon');
      });
    }
    // pokemon added to gym
    knex('pokemon')
      .update({
        in_gym: true
      })
      .where('id', id)
      .limit(1)
      .then(result => {
        req.session.save(err => {
          res.redirect('/gym');
        });
      })
      .catch(err => {
        req.session.error = "Could not update gym status.";
        req.session.message = err.toString();
        req.session.save(err => {
          res.redirect('/error');
        });
      })
  },

  remove: function(req, res) {
    let id = req.params.id;
    if (req.session.p1 === id) {
      req.session.p1 = null;
    } else if (!req.session.p2 || req.session.p1 === id) {
      req.session.p2 = null;
    }
    //whether found or not, it should be set to false
    knex('pokemon')
      .update({
        in_gym: false
      })
      .where('id', id)
      .limit(1)
      .then(result => {
        req.session.save(err => {
          res.redirect('/pokemon');
        });
      })
      .catch(err => {
        req.session.error = "Could not update gym status.";
        req.session.message = err.toString();
        req.session.save(err => {
          res.redirect('/error');
        });
      });
  }
}
