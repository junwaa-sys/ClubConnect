/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      auth0_id: 'rowValue1',
      name: '',
      address: '',
      phone: '',
      email: '',
      role: '',
      access_level: 1,
    },
    {
      id: 2,
      auth0_id: 'rowValue2',
      name: '',
      address: '',
      phone: '',
      email: '',
      role: '',
      access_level: 1,
    },
    {
      id: 3,
      auth0_id: 'rowValue2',
      name: '',
      address: '',
      phone: '',
      email: '',
      role: '',
      access_level: 1,
    },
  ])
}
