/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('member_subscriptions').del()
  await knex('member_subscriptions').insert([
    {
      id: 1,
      member_id: 'auth03',
      subscriptions_id: 1,
      concession_qty: 10,
      valid_from: '2023-04-01',
      valid_to: '2023-04-08',
      renewal_date: '2023-04-19',
      payment_reference: 'abcd1',
      payment_status: 'paid',
    },
    {
      id: 2,
      member_id: 'cus_NjSN6FzTG7QvAT',
      subscriptions_id: 2,
      concession_qty: 10,
      valid_from: '2023-04-01',
      valid_to: '2023-04-31',
      renewal_date: '2023-04-25',
      payment_reference: 'abcd2',
      payment_status: 'paid',
    },
    {
      id: 3,
      member_id: 'auth01',
      subscriptions_id: 1,
      concession_qty: 10,
      valid_from: '2023-04-01',
      valid_to: '2023-12-31',
      renewal_date: '2023-12-31',
      payment_reference: 'abcd3',
      payment_status: 'pending',
    },

    {
      id: 4,
      member_id: 'cus_NjSN6FzTG7QvAT',
      subscriptions_id: 3,
      concession_qty: 10,
      valid_from: '2023-04-01',
      valid_to: '2050-12-31',
      renewal_date: '2023-12-31',
      payment_reference: 'abcd3',
      payment_status: 'pending',
    },
    {
      id: 5,
      member_id: 'cus_NjSN6FzTG7QvAT',
      subscriptions_id: 3,
      concession_qty: 10,
      valid_from: '2023-05-01',
      valid_to: '2050-12-31',
      renewal_date: '2023-12-31',
      payment_reference: 'abcd4',
      payment_status: 'pending',
    },
  ])
}
