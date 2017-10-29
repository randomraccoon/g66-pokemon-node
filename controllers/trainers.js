const knex = require("../db/knex.js");

module.exports = {
  viewAll: function(req, res) {
    let returnObj = {
      error: req.session.error,
      message: req.session.message
    };
    req.session.error = null;
    req.session.message = null;
    knex.raw(`
      SELECT t.id, t.name, count(p.id) AS pokemon_count FROM trainers AS t
      LEFT JOIN pokemon AS p ON (t.id = p.trainer_id)
      GROUP BY t.id
      ORDER BY t.id`)
      .then(resultObj => {
        returnObj.trainers = resultObj.rows;
        // console.log(JSON.stringify(returnObj, null, 2));
        res.render('pages/trainers', returnObj);
      })
      .catch(err => {
        console.log(err);
        req.session.error = err;
        req.session.message = "Could not load trainer page.";
        req.session.save(err => {
          res.redirect('/error');
        });
      })
  },

  create: function(req, res) {
    knex('trainers')
      .insert({
        name: req.body.name
      }, '*')
      .then()
      .catch((err) => {
        console.log(err);
        req.session.error = err;
        req.session.message = "There was an error adding the trainer. Try again.";
      })
      .then(() => {
        req.session.save(err => {
          res.redirect('/trainers');
        });
      });
  },

  delete: function(req, res) {
    let id = req.params.id;
    knex('trainers')
      .del()
      .where('id', id)
      .then()
      .catch(err => {
        console.log(err);
        req.session.error = err;
        req.session.message = "There was an error deleting the trainer. Please try again.";
      })
      .then(() => {
        req.session.save(err => {
          res.redirect('/trainers');
        });
      });
  },

  viewOne: function(req, res) {
    let id = req.params.id;
    let returnObj = {
      error: req.session.error,
      message: req.session.message,
      p1: req.session.p1,
      p2: req.session.p2
    };
    req.session.error = null;
    req.session.message = null;
    knex('trainers')
      .where('id', id)
      .limit(1)
      .then(responseArr => {
        returnObj.trainer = responseArr[0];
        knex.raw(`
          SELECT p.id, p.species_id, s.name AS species, s.image_name, p.name, p.cp, p.in_gym FROM pokemon AS p
          JOIN species AS s ON (s.id = p.species_id)
          WHERE p.trainer_id = ${id}`)
          .then(resultObj => {
            returnObj.pokemon = resultObj.rows;
            res.render('pages/trainer', returnObj);
          });
      })
      .catch(err => {
        console.log(err);
        req.session.error = err;
        req.session.message = "There was an error displaying the trainer. Please try again.";
        req.session.save(err => {
          res.redirect('/trainers');
        });
      });
  }

}
