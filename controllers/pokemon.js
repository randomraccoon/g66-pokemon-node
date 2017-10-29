const knex = require("../db/knex.js");

module.exports = {
  viewAll: function(req, res) {
    let returnObj = {
      error: req.session.error,
      message: req.session.message
    };
    console.log(JSON.stringify(returnObj));
    req.session.error = null;
    req.session.message = null;
    knex.raw(`
      SELECT p.id, p.species_id, s.name AS species, s.image_name, p.name, t.name AS trainer, p.cp, p.in_gym FROM pokemon AS p
      JOIN trainers AS t ON (t.id = p.trainer_id)
      JOIN species AS s ON (s.id = p.species_id)
      ORDER BY t.name`)
      .then(resultObj => {
        returnObj.pokemon = resultObj.rows;
        updateCookies(req.session, returnObj.pokemon);
        knex.raw(`
          SELECT t.id, t.name, count(p.id) AS pokemon_count FROM trainers AS t
          LEFT JOIN pokemon AS p ON (t.id = p.trainer_id)
          GROUP BY t.id
          ORDER BY t.id`)
          .then(resultObj => {
            returnObj.trainers = resultObj.rows;
            knex('species')
              .select('id','name','description')
              .then(speciesArr => {
                returnObj.species = speciesArr;
                returnObj.p1 = req.session.p1;
                returnObj.p2 = req.session.p2;
                // console.log(JSON.stringify(returnObj, null, 2));
                res.render('pages/pokemon', returnObj);
              })

          })
      })
      .catch(err => {
        console.log(err);
        req.session.message = err.toString();
        req.session.error = "Could not load pokemon page.";
        req.session.save(err => {
          res.redirect('/error');
        });
      })
  },

  create: function(req, res) {
    console.log(Object.keys(req.body));
    let species_id = cleanSpeciesInput(req.body.species);
    knex('pokemon')
      .insert({
        name: req.body.name,
        species_id: species_id,
        cp: req.body.cp,
        trainer_id: req.body.trainer_id
      }, '*')
      .then()
      .catch((err) => {
        console.log(err);
        req.session.message = err.toString();
        req.session.error = "There was an error adding the Pokémon. Try again.";
      })
      .then(() => {
        req.session.save(err => {
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
        req.session.message = err.toString;
        req.session.error = "There was an error deleting the pokemon. Please try again.";
      })
      .then(() => {
        req.session.save(err => {
          res.redirect('/pokemon');
        });
      });
  },

  editPage: function(req, res) {
    req.session.editMode = true;
    req.session.save(err => {
      res.redirect('/pokemon/' + req.params.id);
    });
  },

  viewOne: function(req, res) {
    let returnObj = {
      error: req.session.error,
      message: req.session.message,
      editMode: req.session.editMode
    };
    req.session.error = null;
    req.session.message = null;
    req.session.editMode = null;
    knex.raw(`
      SELECT p.id, p.species_id, s.name AS species, s.image_name, s.description, p.name, t.name AS trainer, p.cp, p.trainer_id, p.in_gym FROM pokemon AS p
      JOIN trainers AS t ON (t.id = p.trainer_id)
      JOIN species AS s ON (s.id = p.species_id)
      WHERE (p.id = ${req.params.id})
      ORDER BY t.name
      LIMIT 1`)
      .then(resultObj => {
        returnObj.pokemon = resultObj.rows[0];
        knex.raw(`
          SELECT t.id, t.name, count(p.id) AS pokemon_count FROM trainers AS t
          LEFT JOIN pokemon AS p ON (t.id = p.trainer_id)
          GROUP BY t.id
          ORDER BY t.id`)
          .then(resultObj => {
            returnObj.trainers = resultObj.rows;
            knex('species')
              .then(speciesArr => {
                returnObj.species = speciesArr;
                // console.log(JSON.stringify(returnObj.pokemon, null, 2));
                // console.log("params", JSON.stringify(req.params));
                res.render('pages/pokemon-single', returnObj);
              })

          })
      })
      .catch(err => {
        console.log(err);
        req.session.message = err.toString();
        req.session.error = "Could not load pokemon page.";
        req.session.save(err => {
          res.redirect('/error');
        });
      })
  },

  update: function(req, res) {
    let newObj = {
      name: req.body.name,
      cp: req.body.cp,
      trainer_id: req.body.trainer_id,
      species_id: cleanSpeciesInput(req.body.species)
    };

    console.log(JSON.stringify(newObj, null, 2));

    knex('pokemon')
      .update(newObj)
      .where('id', req.params.id)
      .then(result => {
        req.session.save(err=> {
          res.redirect('/pokemon/' + req.params.id);
        });
      })
      .catch(err=>{
        console.log(err);
        req.session.error = "Could not save pokémon update.";
        req.session.message = err.toString();
        req.session.save(err => {
          res.redirect('/error');
        });
      });
  }
}

function cleanSpeciesInput(speciesInput) {
  //removes all non-numeric characters and converts to number
  return +(speciesInput.replace(/\D/g, ''));
}

function updateCookies(session, pokemonArr) {
  let gym = pokemonArr.filter(p=>p.in_gym).map(p=>p.id);
  [session.p1, session.p2] = gym.concat([null, null]);
}
