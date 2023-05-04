import express from 'express'
const router = express.Router()
import db from '../db/membershipOptions'
import checkJwt from '../auth0'

router.get('/', checkJwt, async (req, res) => {
  try {
    const options = await db.getPublishedSubscriptions()

    res.json(options)
  } catch (err) {
    res.status(500)
    res.json({
      message:
        'Could not retrieve subscriptions from the database. Try again later.',
    })
  }
})

export default router
