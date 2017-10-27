const knex = require("../db/knex.js");

module.exports = {
  viewAll: function(req, res) {
    let returnObj = {error: req.session.error, message: req.session.message};
    req.session.error = null;
    req.session.message = null;
    knex.raw(`
      SELECT p.id, p.name, t.name AS trainer, p.cp, p.in_gym FROM pokemon AS p
      JOIN trainers AS t ON (t.id = p.trainer_id)
      ORDER BY p.id`)
      .then(resultObj=>{
        returnObj.pokemon = resultObj.rows;
        knex.raw(`
          SELECT t.id, t.name, count(p.id) AS pokemon_count FROM trainers AS t
          LEFT JOIN pokemon AS p ON (t.id = p.trainer_id)
          GROUP BY t.id
          ORDER BY t.id`)
          .then(resultObj=>{
            returnObj.trainers = resultObj.rows;
            // console.log(JSON.stringify(returnObj, null, 2));
            res.render('pages/pokemon', returnObj);
          })
      })
      .catch(err=>{
        console.log(err);
        req.session.error = err;
        req.session.message = "Could not load pokemon page.";
        req.session.save(err=>{
          res.redirect('/error');
        });
      })
  },

  create: function(req, res) {
    knex('pokemon')
      .insert({
        name: req.body.name,
        trainer_id: req.body.trainer_id,
        cp: req.body.cp
      }, '*')
      .then()
      .catch((err)=>{
        console.log(err);
        req.session.error = err;
        req.session.message = "There was an error adding the pokemón. Try again.";
      })
      .then(()=>{
        req.session.save(err=>{
          res.redirect('/pokemon');
        });
      });
  },

  delete: function(req, res) {
    let id = req.params.id;
    knex('pokemon')
      .del()
      .where('id', id)
      .then()
      .catch(err => {
        console.log(err);
        req.session.error = err;
        req.session.message = "There was an error deleting the pokemon. Please try again.";
      })
      .then(()=>{
        req.session.save(err=>{
          res.redirect('/pokemon');
        });
      });
  },

  update: function(req, res) { //TODO
    req.session.save(err=>{
      res.redirect('/pokemon');
    });
  }

}
