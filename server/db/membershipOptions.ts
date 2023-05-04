import { Subscription } from '../../models/subscriptions'
import connection from './connection'

function getSubscriptionById(subscriptionId: number, db = connection) {
  return db('subscriptions').select().where('id', subscriptionId).first()
}

function getPublishedSubscriptions(db = connection) {
  return db('subscriptions')
    .select()
    .where({ is_published: true, archived: false })
}

async function getAllSubscriptions(db = connection) {
  const results = await db('subscriptions')
  return results
}

async function addSubscription(
  newOption: Omit<Subscription, 'id'>,
  db = connection
) {
  const {
    name,
    cover_period,
    price,
    default_concessions,
    is_published,
    archived,
  } = newOption
  return db('subscriptions').insert({
    name,
    cover_period,
    price,
    default_concessions,
    is_published,
    archived,
  })
}

async function updateSubscription(
  updatedOption: Subscription,
  db = connection
) {
  const {
    name,
    cover_period,
    price,
    default_concessions,
    is_published,
    archived,
    stripe_price,
    stripe_product,
  } = updatedOption
  return db('subscriptions').where('id', updatedOption.id).update({
    name,
    cover_period,
    price,
    default_concessions,
    is_published,
    archived,
    stripe_price,
    stripe_product,
  })
}

async function archiveSubscription(id: number, db = connection) {
  return db('subscriptions').where('id', id).update('archived', true)
}

async function restoreSubscription(id: number, db = connection) {
  return db('subscriptions').where('id', id).update('archived', false)
}

async function deleteSubscription(id: number, db = connection) {
  return db('subscriptions').where('id', id).del()
}

export default {
  getPublishedSubscriptions,
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  archiveSubscription,
  restoreSubscription,
  deleteSubscription,
}
