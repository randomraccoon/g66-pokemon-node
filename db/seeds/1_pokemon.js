exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('pokemon').del(),
    knex('pokemon').insert({name: "Bulbasaur", cp: 15, trainer_id: 1}),
    knex('pokemon').insert({name: "Ivysaur", cp: 60, trainer_id: 1}),
    knex('pokemon').insert({name: "Venasaur", cp: 100, trainer_id: 2}),
    knex('pokemon').insert({name: "Charmander", cp: 15, trainer_id: 2}),
    knex('pokemon').insert({name: "Charmeleon", cp: 55, trainer_id: 2}),
    knex('pokemon').insert({name: "Charizard", cp: 99, trainer_id: 3}),
    knex('pokemon').insert({name: "Squirtle", cp: 19, trainer_id: 4}),
    knex('pokemon').insert({name: "Wartortle", cp: 22, trainer_id: 4}),
    knex('pokemon').insert({name: "Blastoise", cp: 111, trainer_id: 4}),
    knex('pokemon').insert({name: "Caterpie", cp: 5, trainer_id: 3}),
    knex('pokemon').insert({name: "Metapod", cp: 18, trainer_id: 1}),
    knex('pokemon').insert({name: "Butterfree", cp: 104, trainer_id: 1})
  );
};
