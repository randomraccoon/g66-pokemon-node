const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const knex = require('../db/knex.js');

module.exports = function(app){
  const store = new KnexSessionStore({
      knex: knex
  });

  app.use(session({
      secret: 'domo arigato',
      cookie: {
          maxAge: 2592000 // 30 days
      },
      resave: false,
      saveUninitialized: false,
      store: store
  }));
}
