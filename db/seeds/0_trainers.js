exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('trainers').del(),

    // Inserts seed entries
    knex('trainers').insert({name: "Markel" }),
    knex('trainers').insert({name: "Jacob" }),
    knex('trainers').insert({name: "Ella" }),
    knex('trainers').insert({name: "Valencia" })

  );
};
