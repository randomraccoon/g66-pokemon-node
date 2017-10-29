exports.up = (knex, Promise) => {
  return knex.schema.alterTable('pokemon', table => {
    table.integer('species_id')
     .notNullable()
     .references('id')
     .inTable('species')
     .onDelete('CASCADE')
     .index();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('pokemon');
};
