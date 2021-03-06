const main = require("../controllers/main.js");
const pokemon = require("../controllers/pokemon.js");
const trainers = require("../controllers/trainers.js");
const gym = require("../controllers/gym.js");

module.exports = function(app){

  app.use(log);

  app.get('/error', main.error);

  app.get('/', pokemon.viewAll);

  app.get('/pokemon', pokemon.viewAll);

  app.post('/pokemon', pokemon.create);

  app.get('/pokemon/:id', pokemon.viewOne);

  app.get('/pokemon/edit/:id', pokemon.editPage);

  app.post('/pokemon/:id', pokemon.update);

  app.get('/pokemon/del/:id', pokemon.delete);

  app.get('/gym/add/:id', gym.add);

  app.post('/gym/add', gym.addPost)

  app.get('/gym/del/:id', gym.remove)

  app.get('/trainers', trainers.viewAll);

  app.get('/trainers/:id', trainers.viewOne);

  app.post('/trainers', trainers.create);

  app.get('/trainers/del/:id', trainers.delete);

  app.get('/gym', gym.index);

  app.get('/gym/reset', gym.reset);

  app.get('/pokedex', main.pokedex);

  app.use(main['404']);
}

function log(req, res, next) {
  console.log("Routing to", req.originalUrl);
  next();
}
