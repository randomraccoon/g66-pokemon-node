const main = require("../controllers/main.js");
const pokemon = require("../controllers/pokemon.js");
const trainers = require("../controllers/trainers.js");
const gym = require("../controllers/gym.js");

module.exports = function(app){

  app.use(log);

  app.get('/', pokemon.viewAll);

  app.get('/pokemon', pokemon.viewAll);

  app.post('/pokemon', pokemon.create);

  app.get('/pokemon/:id', pokemon.viewOne);

  app.get('/pokemon/edit/:id', pokemon.editPage);

  app.post('/pokemon/:id', pokemon.update);

  app.get('/pokemon/del/:id', pokemon.delete);

  app.get('/trainers', trainers.viewAll);

  app.post('/trainers', trainers.create);

  // app.post('/trainers/:id', trainers.update);

  app.get('/trainers/del/:id', trainers.delete);

  app.get('/gym', gym.index);

  app.get('/error', main.error);

  app.get('/pokedex', main.pokedex);

  app.use(main['404']);
}

function log(req, res, next) {
  console.log("Routing to", req.originalUrl);
  next();
}
