import connection from './connection'
import { getMembersSubscriptionById } from './dashboard'
import api from '../stripe.api'
import { Subscription } from '../../models/subscriptions'

export async function getStripeId(id: string, db = connection) {
  const memberProfile = await getMembersSubscriptionById(id)
  if (memberProfile.stripeId == null) {
    const stripeProfile = await api.createStripeCustomer(memberProfile)

    await db('member_profiles')
      .where('auth0_id', id)
      .update('stripe_id', stripeProfile.id)

    return stripeProfile.id
  } else {
    return memberProfile.stripeId
  }
}

export async function addStripeDetailsToMembershipOption(
  productId: string,
  priceId: string,
  id: number,
  db = connection
) {
  return db('subscriptions')
    .where('id', id)
    .update({ stripe_price: priceId, stripe_product: productId })
}

export async function customerSubscriptionSucceeded(
  productId: string | undefined,
  memberId: string | undefined,
  validFrom: string | undefined,
  validTo: string | undefined,
  db = connection
) {
  const membershipOption = await db('subscriptions')
    .where('stripe_product', productId)
    .select('*')
    .first()

  let validFromFormattedDate
  let validToFormattedDate

  if (validFrom) {
    const validFromDate = new Date(Number(validFrom) * 1000)
    validFromFormattedDate = `${validFromDate.getUTCFullYear()}-${(
      validFromDate.getUTCMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${validFromDate
      .getUTCDate()
      .toString()
      .padStart(2, '0')}`
  }
  if (validTo) {
    const validToDate = new Date(Number(validTo) * 1000)
    validToFormattedDate = `${validToDate.getUTCFullYear()}-${(
      validToDate.getUTCMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${validToDate
      .getUTCDate()
      .toString()
      .padStart(2, '0')}`
  }

  const newSub = {
    member_id: memberId,
    subscriptions_id: membershipOption.id,
    concession_qty: membershipOption.default_concessions,
    payment_status: 'paid',
    valid_from: validFromFormattedDate,
    valid_to: validToFormattedDate,
    renewal_date: validToFormattedDate,
  }
  await db('member_subscriptions').insert(newSub)
}

export async function handleChargeSucceeded(
  customerId: string,
  paymentAmount: string,
  db = connection
) {
  const entries = await db('member_subscriptions')
    .join(
      'subscriptions',
      'member_subscriptions.subscriptions_id',
      '=',
      'subscriptions.id'
    )
    .select(
      'member_subscriptions.id as memberSubId',
      'payment_status',
      'member_id',
      'price',
      'cover_period',
      'concession_qty'
    )
    .where({
      member_id: customerId,
    })
  const subTypes: Subscription[] = await db('subscriptions').select()
  const purchasedSub = subTypes.filter(
    (sub) => Number(sub.price) * 100 === Number(paymentAmount)
  )
  const concessions = entries.filter(
    (item) =>
      item.cover_period === 'concession' || item.cover_period === 'single'
  )
  let totalConcessions = 0
  concessions.forEach((entry) => (totalConcessions += entry.concession_qty))
  if (concessions.length > 1) {
    const nullConcessions = concessions.filter((sub, index) => index >= 1)
    const nullIds = nullConcessions.map((sub) => sub.memberSubId)
    await db('member_subscriptions').whereIn('id', nullIds).del()
  }
  await db('member_subscriptions')
    .where('id', concessions[0].memberSubId)
    .update({ payment_status: 'paid', concession_qty: totalConcessions })
}
export async function getSubscriptionByMemberId(
  memberId: string,
  stripeSubscriptionId: string,
  db = connection
) {
  return db('subscriptions')
    .join(
      'member_subscriptions',
      'subscriptions.id',
      'member_subscriptions.subscriptions_id'
    )
    .select('subscriptions.id', 'subscriptions.stripe_product')
    .where('member_subscriptions.member_id', memberId)
    .where('subscriptions.stripe_product', stripeSubscriptionId)
    .first()
}

export async function cancelSubscription(
  cancelAtPeriodEnd: boolean,
  cancelAt: Date,
  cancelledAt: Date,
  memberStripeId: string,
  stripeSubscriptionId: string,
  db = connection
) {
  const subscriptionId = await getSubscriptionByMemberId(
    memberStripeId,
    stripeSubscriptionId
  )
  console.log(subscriptionId)
  if (cancelAtPeriodEnd) {
    return db('member_subscriptions')
      .update({ payment_status: 'cancelled' })
      .where('subscriptions_id', subscriptionId.id)
      .where('member_id', memberStripeId)
  } else if (cancelAt != null) {
    const cancelDate = new Date(Number(cancelAt) * 1000)

    const cancelAtDate = `${cancelDate.getUTCFullYear()}-${(
      cancelDate.getUTCMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${cancelDate.getUTCDate().toString().padStart(2, '0')}`

    return db('member_subscriptions')
      .update({
        payment_status: 'cancelled',
        valid_to: cancelAtDate,
      })
      .where('subscriptions_id', subscriptionId.id)
  } else {
    const cancelledDate = new Date(Number(cancelledAt) * 1000)
    const cancelledAtDate = `${cancelledDate.getUTCFullYear()}-${(
      cancelledDate.getUTCMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${cancelledDate
      .getUTCDate()
      .toString()
      .padStart(2, '0')}`
    return db('member_subscriptions')
      .update({ payment_status: 'cancelled', valid_to: cancelledAtDate })
      .where('subscriptions_id', subscriptionId.id)
  }
}

function handleSubscriptionPaused() {}

export default {
  addStripeDetailsToMembershipOption,
  getStripeId,
  handleChargeSucceeded,
  cancelSubscription,
  handleSubscriptionPaused,
}
