/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('member_subscriptions', (table) => {
    table.increments('id').primary
    table.integer('member_id')
    table.integer('subscriptions_id')
    table.integer('concession_qty')
    table.string('valid_from')
    table.string('valid_to')
    table.date('renewal_date')
    table.string('payment_reference')
    table.string('payment_status')
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('member_subscriptions')
}
