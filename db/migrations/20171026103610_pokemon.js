exports.up = (knex, Promise) => {
  return knex.schema.createTable('pokemon', table => {
    table.increments();
    table.string('name').notNullable();
    table.integer('trainer_id')
     .notNullable()
     .references('id')
     .inTable('trainers')
     .onDelete('CASCADE')
     .index();
    table.integer('cp').notNullable();
    table.boolean('in_gym').notNullable().defaultTo('false');
    table.timestamps(true, true);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('pokemon');
};
