import { MemberSubscription } from '../models/memberSubscription'
import { Subscription } from '../models/subscriptions'
import db from './db/membershipOptions'

const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET)
async function initiateCheckoutSession(
  priceId: string,
  customerId: string,
  mode: string
) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode:
        mode === 'concession' || mode === 'single' ? 'payment' : 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer: customerId,
      success_url: `${process.env.RETURN_URL}?session_id={CHECKOUT_SESSION_ID}`,
    })
    return session
  } catch (err) {
    console.log(err)
    if (err instanceof Error) {
      return err
    }
  }
}
async function initiateCheckoutConfig() {
  const configuration = await stripe.billingPortal.configurations.create({
    business_profile: {
      headline: 'Manage your subscription',
    },
    features: {
      payment_method_update: {
        enabled: true,
      },
      invoice_history: {
        enabled: true,
      },
      subscription_cancel: {
        enabled: true,
        mode: 'at_period_end',
        proration_behavior: 'none',
      },
      subscription_pause: {
        enabled: true,
      },
    },
  })
  return configuration
}
async function initiateCheckoutPortal(
  stripeId: string,
  subscriptionId: number
) {
  await db.getSubscriptionById(subscriptionId)
  const config = await initiateCheckoutConfig()
  const session = await stripe.billingPortal.sessions.create({
    customer: stripeId,
    return_url: process.env.RETURN_URL,
    configuration: config.id,
  })
  return session
}

async function createStripeCustomer(memberProfile: MemberSubscription) {
  const customer = await stripe.customers.create({
    name: memberProfile.memberName,
    email: memberProfile.memberEmail,
    metadata: {
      appId: memberProfile.auth0id,
    },
  })
  return customer
}

async function createStripeSubscription(customerId: string, priceId: string) {
  await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
  })
}

async function createStripeMembershipOption(newOption: Subscription) {
  const product = await stripe.products.create({
    name: newOption.name,
    metadata: {
      appId: newOption.id,
    },
  })
  let options
  switch (newOption.cover_period) {
    case 'concession':
      options = {
        unit_amount_decimal: Number(newOption.price) * 100,
        currency: 'nzd',
        product: product.id,
      }
      break
    case 'single':
      options = {
        unit_amount_decimal: Number(newOption.price) * 100,
        currency: 'nzd',
        product: product.id,
      }
      break
    case 'fortnight':
      options = {
        unit_amount_decimal: Number(newOption.price) * 100,
        currency: 'nzd',
        recurring: {
          interval: 'week',
          interval_count: 2,
        },
        product: product.id,
      }
      break
    default:
      options = {
        unit_amount_decimal: Number(newOption.price) * 100,
        currency: 'nzd',
        recurring: {
          interval: newOption.cover_period,
          interval_count: 1,
        },
        product: product.id,
      }
  }
  const price = await stripe.prices.create(options)
  return {
    price,
    product,
  }
}

export default {
  initiateCheckoutSession,
  initiateCheckoutPortal,
  createStripeCustomer,
  createStripeSubscription,
  createStripeMembershipOption,
}
