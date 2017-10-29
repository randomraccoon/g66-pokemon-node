exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('pokemon').del(),
    knex('pokemon').insert([
      {name: "Neil", species_id: 2, cp: 60, trainer_id: 1},
      {name: "Bob", species_id: 4, cp: 15, trainer_id: 2},
      {name: "Frank", species_id: 9, cp: 111, trainer_id: 4},
      {name: "Mitzy", species_id: 151, cp: 5, trainer_id: 3},
      {name: "Snuggles", species_id: 47, cp: 18, trainer_id: 1},
      {name: "Quackers", species_id: 54, cp: 104, trainer_id: 1},
      {name: "Blibbers", species_id: 63, cp: 15, trainer_id: 1},
      {name: "Ernie", species_id: 89, cp: 100, trainer_id: 2},
      {name: "Evelyn", species_id: 133, cp: 55, trainer_id: 2},
      {name: "Flenser", species_id: 162, cp: 99, trainer_id: 3},
      {name: "Baaaahhb", species_id: 179, cp: 19, trainer_id: 4},
      {name: "Tammy", species_id: 218, cp: 22, trainer_id: 4}
    ]);
};
