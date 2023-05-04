/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('subscriptions').del()
  await knex('subscriptions').insert([
    {
      id: 1,
      name: 'Weekly',
      cover_period: 'week',
      is_published: true,
      price: 15.0,
      stripe_product: 'prod_NhfQHoo9M3EInr',
      stripe_price: 'price_1MwG5pD316RdNxAhzAxuduxW',
      is_active: true,
      default_concessions: 2,
      archived: false,
    },
    {
      id: 2,
      name: 'Monthly',
      cover_period: 'month',
      is_published: true,
      price: 100.0,
      stripe_product: 'prod_NhfTJnA1JT9AV5',
      stripe_price: 'price_1MwG8zD316RdNxAhZH8k5DvA',
      is_active: false,
      default_concessions: 8,
      archived: false,
    },
    {
      id: 3,
      name: '10 Trip',
      cover_period: 'concession',
      is_published: true,
      price: 150.0,
      stripe_product: 'prod_NhfVYz3yeqHAnH',
      stripe_price: 'price_1MwGA1D316RdNxAh4JthdPYJ',
      is_active: false,
      default_concessions: 10,
      archived: false,    
    },
  ])
}
