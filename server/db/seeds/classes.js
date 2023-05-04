/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('classes').del()
  await knex('classes').insert([
    { id: 1, name: 'kickboxing', description: 'Jerome Le Banner' },
    { id: 2, name: 'boxing', description: 'Mike Tyson' },
    { id: 3, name: 'Brazilian jiu-jitsu', description: 'Roger Gracie' },
  ])
}
