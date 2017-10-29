exports.up = (knex, Promise) => {
  return knex.schema.createTable('species', table => {
    table.increments();
    table.string('name').notNullable().unique();
    table.string('description').notNullable();
    table.string('image_name').notNullable().unique();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('species');
};
