exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('trainers').del(),

    // Inserts seed entries
    knex('trainers').insert([
      {name: "Markel" },
      {name: "Jacob" },
      {name: "Ella" },
      {name: "Valencia" }
    ])
  );
};
