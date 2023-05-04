import express from 'express'
const router = express.Router()
import { getStripeId } from '../db/stripe'
import db from '../db/membershipOptions'
import checkout from '../db/checkout'
import checkJwt from '../auth0'
import stripe from '../stripe.api'
import { JwtRequest } from '../auth0'

router.post('/initiate-checkout', checkJwt, async (req: JwtRequest, res) => {
  const subscription = await db.getSubscriptionById(req.body.subscriptionId)
  const auth0Id = req.auth?.sub
  if (
    subscription.cover_period === 'concession' ||
    subscription.cover_period === 'single'
  ) {
    await checkout.addPendingConcession({
      memberId: req.body.memberId,
      subscriptionId: subscription.id,
      payment_status: 'pending',
    })
  }
  if (auth0Id) {
    const stripeCustomerId = await getStripeId(auth0Id)
    const session = await stripe.initiateCheckoutSession(
      subscription.stripe_price,
      stripeCustomerId,
      subscription.cover_period
    )

    res.json(session)
  }
})

router.post('/manage-subscription', checkJwt, async (req: JwtRequest, res) => {
  try {
    if (req.auth?.sub) {
      const stripeCustomerId = await getStripeId(req.auth?.sub)
      const session = await stripe.initiateCheckoutPortal(
        stripeCustomerId,
        req.body.subscriptionId
      )
      res.json(session)
    } else {
      res.json({ message: 'Something went wrong, please try again later.' })
    }
  } catch (err) {
    res.json({ message: 'Something went wrong, please try again later.' })
  }
})

export default router
