/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('class_schedules').del()
  await knex('class_schedules').insert([
    { id: 1, class_id: 1, schedule_date: '2023-04-02' },
    { id: 2, class_id: 2, schedule_date: '2023-04-15' },
    { id: 3, class_id: 3, schedule_date: '2023-04-20' },
  ])
}
