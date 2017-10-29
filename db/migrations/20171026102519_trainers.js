exports.up = (knex, Promise) => {
 return knex.schema.createTable('trainers', table => {
   table.increments();
   table.string('name').notNullable();
   table.timestamps(true, true);
 });
};

exports.down = (knex, Promise) => {
 return knex.schema.dropTableIfExists('trainers');
};
