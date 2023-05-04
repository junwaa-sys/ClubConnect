/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('checkins', (table) => {
    table.increments('id').primary
    table.integer('member_id')
    table.string('checked_in_at')
    table.string('checkedin_date')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('checkins')
}
