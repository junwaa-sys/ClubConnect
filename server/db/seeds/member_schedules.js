/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('member_schedules').del()
  await knex('member_schedules').insert([
    { id: 1, member_id: 1, class_schedule_id: 1 },
    { id: 2, member_id: 1, class_schedule_id: 2 },
    { id: 3, member_id: 1, class_schedule_id: 3 },
  ])
}
