/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('checkins').del()
  await knex('checkins').insert([
    { id: 1, member_id: 1, checkedin_date: '2023-04-19' },
    { id: 2, member_id: 2, checkedin_date: '2023-04-19' },
  ])
}
