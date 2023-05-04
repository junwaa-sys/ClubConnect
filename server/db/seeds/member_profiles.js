/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('member_profiles').del()
  await knex('member_profiles').insert([
    {
      id: 1,
      auth0_id: 'auth03',
      subscriptions_id: '',
      name: 'Daniel',
      address: '',
      phone: '',
      email: '',
      emergency_contact_name: '',
      emergency_contact_phone: '',
      stripe_id: 'cus_NjUEI5GVQgChp4',
    },
    {
      id: 2,
      auth0_id: 'auth02',
      subscriptions_id: 1,
      name: 'Reuben',
      address: '',
      phone: '',
      email: 'reuben.jensen11gmail.com',
      emergency_contact_name: '',
      emergency_contact_phone: '',
      stripe_id: 'cus_NjSN6FzTG7QvAT',
    },
    {
      id: 3,
      auth0_id: 'auth01',
      subscriptions_id: '',
      name: 'Joon',
      address: '',
      phone: '',
      email: '',
      emergency_contact_name: '',
      emergency_contact_phone: '',
      stripe_id: 'cus_NjV1CLLEHFci5U',
    },
  ])
}
