/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('member_profiles', (table) => {
    table.increments('id').primary
    table.string('auth0_id')
    table.integer('subscriptions_id')
    table.string('name')
    table.string('address')
    table.string('phone')
    table.string('email')
    table.string('emergency_contact_name')
    table.string('emergency_contact_phone')
    table.string('stripe_id ')
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('member_profiles')
}
