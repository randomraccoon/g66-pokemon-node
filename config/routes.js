const main = require("../controllers/main.js");
const pokemon = require("../controllers/pokemon.js");
const trainers = require("../controllers/trainers.js");
const gym = require("../controllers/gym.js");

module.exports = function(app){

  app.get('/', pokemon.viewAll);

  app.get('/pokemon', pokemon.viewAll);

  app.post('/pokemon', pokemon.create);

  app.post('/pokemon/:id', pokemon.update);

  app.get('/pokemon/del/:id', pokemon.delete);

  app.get('/trainers', trainers.viewAll);

  app.post('/trainers', trainers.create);

  app.post('/trainers/:id', pokemon.update);

  app.get('/trainers/del/:id', pokemon.delete);

  app.get('/gym', gym.index);

  app.get('/error', main.error);

  app.use(main['404']);
}
