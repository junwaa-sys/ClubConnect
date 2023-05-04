import { Router, raw } from 'express'
import db, { customerSubscriptionSucceeded } from '../db/stripe'

const router = Router()

router.post(
  '/webhooks',
  raw({ type: 'application/json' }),
  async (req, res) => {
    const event = req.body

    switch (event.type) {
      case 'charge.succeeded':
        db.handleChargeSucceeded(
          event.data.object.customer,
          event.data.object.amount_captured
        )
        break
      case 'customer.subscription.created':
        {
          const productId = event.data.object.items.data[0].plan.product
          const memberId = event.data.object.customer
          // const productId = 'prod_NhfQHoo9M3EInr'
          const validFrom = event.data.object.current_period_start
          const validTo = event.data.object.current_period_end
          customerSubscriptionSucceeded(productId, memberId, validFrom, validTo)
        }
        break
      case 'customer.subscription.deleted':
        {
          const cancelAtPeriodEnd = event.data.object.cancel_at_period_end
          const cancelAt = event.data.object.cancel_at
          const cancelledAt = event.data.object.canceled_at
          const customerStripeId = event.data.object.customer
          const productId = event.data.object.items.data[0].price.product
          console.log({
            cancelAtPeriodEnd,
            cancelAt,
            cancelledAt,
            customerStripeId,
            productId,
          })
          await db.cancelSubscription(
            cancelAtPeriodEnd,
            cancelAt,
            cancelledAt,
            customerStripeId,
            productId
          )
        }
        break
      // case 'customer.subscription.updated':
      //   {
      //     const cancelAtPeriodEnd = event.data.object.cancel_at_period_end
      //     const cancelAt = event.data.object.cancel_at
      //     const cancelledAt = event.data.object.canceled_at
      //     const customerStripeId = event.data.object.customer
      //     const productId = event.data.object.items.data[0].price.product
      //     await db.cancelSubscription(
      //       cancelAtPeriodEnd,
      //       cancelAt,
      //       cancelledAt,
      //       customerStripeId,
      //       productId
      //     )
      //   }
      //   break
      // TODO ADD MORE WEBHOOKS
      // case 'customer.subscription.deleted':
      //   console.log('customer.subscription.deleted')
      //   break

      // case 'customer.subscription.paused':
      //   db.handleSubscriptionPaused()
      //   break
      // case 'customer.subscription.renewed':
      //   console.log('customer.subscription.renewed')
      //   break
      default:
        console.log(`Unhandled event detected of type: ${event.type}`)
    }
    res.json({ received: true })
  }
)

export default router
