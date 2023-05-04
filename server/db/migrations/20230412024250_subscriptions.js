/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('subscriptions', (table) => {
    table.increments('id').primary
    table.string('name')
    table.string('cover_period')
    table.boolean('is_published')
    table.double('price')
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('subscriptions')
}
