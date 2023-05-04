import { PendingSubscription } from '../../models/subscriptions'
import connection from './connection'

function getStripePriceId(subscriptionId: number, db = connection) {
  return db('subscriptions')
    .select('stripe_price')
    .where('id', subscriptionId)
    .first()
}

async function addPendingConcession(
  data: PendingSubscription,
  db = connection
) {
  const subType = await db('subscriptions')
    .select()
    .where('id', data.subscriptionId)
    .first()
  return db('member_subscriptions').insert({
    member_id: data.memberId,
    subscriptions_id: subType.id,
    payment_status: 'pending',
    concession_qty: subType.default_concessions,
    valid_from: '2023-04-01',
    valid_to: '3000-04-31',
    renewal_date: '3000-04-25',
  })
}

export default { getStripePriceId, addPendingConcession }
