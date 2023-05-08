import express from 'express'
const router = express.Router()
import db from '../db/membershipOptions'
import stripe from '../stripe.api'
import checkJwt from '../auth0'

router.get('/', checkJwt, async (req, res) => {
  try {
    const options = await db.getAllSubscriptions()
    res.json(options)
  } catch (err) {
    res.status(500)
    res.json({
      message:
        'Could not retrieve subscriptions from the database. Try again later.',
    })
  }
})

router.post('/', checkJwt, async (req, res) => {
  try {
    const newId = await db.addSubscription(req.body)
    const newOption = { ...req.body }
    newOption.id = newId[0]
    console.log({ newOption })
    const stripeVals = await stripe.createStripeMembershipOption(newOption)
    newOption.stripe_price = stripeVals.price.id
    newOption.stripe_product = stripeVals.product.id

    await db.updateSubscription(newOption)
    const options = await db.getAllSubscriptions()
    res.json(options)
  } catch (err) {
    res.status(500)
    res.json({
      message: 'Something went wrong. Please refresh the page and try again.',
    })
  }
})

router.patch('/', checkJwt, async (req, res) => {
  try {
    await db.updateSubscription(req.body)
    const options = await db.getAllSubscriptions()
    res.json(options)
  } catch (err) {
    res.status(500)
    res.json({
      message: 'Something went wrong. Please refresh the page and try again.',
    })
  }
})

router.patch('/archive', checkJwt, async (req, res) => {
  try {
    await db.archiveSubscription(req.body.id)
    const options = await db.getAllSubscriptions()
    res.json(options)
  } catch (err) {
    res.status(500)
    res.json({
      message: 'Something went wrong. Please refresh the page and try again.',
    })
  }
})
router.patch('/restore', checkJwt, async (req, res) => {
  try {
    await db.restoreSubscription(req.body.id)
    const options = await db.getAllSubscriptions()
    res.json(options)
  } catch (err) {
    res.status(500)
    res.json({
      message: 'Something went wrong. Please refresh the page and try again.',
    })
  }
})

router.delete('/', checkJwt, async (req, res) => {
  try {
    await db.deleteSubscription(req.body.id)
    const options = await db.getAllSubscriptions()
    res.json(options)
  } catch (err) {
    res.status(500)
    res.json({
      message: 'Something went wrong. Please refresh the page and try again.',
    })
  }
})

export default router
