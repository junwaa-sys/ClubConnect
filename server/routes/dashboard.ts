import express from 'express'
import {
  getMembersSubscriptionById,
  createMemberProfile,
  getCurrentMember,
} from '../db/dashboard'
import checkJwt, { JwtRequest } from '../auth0'

const router = express.Router()

// POST '/api/v1/dashboard'
router.post('/', async (req, res) => {
  try {
    const newMemberProfile = await createMemberProfile(req.body)
    res.json(newMemberProfile)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: 'There was an error getting your subscriptions',
    })
  }
})

//GET 'api/v1/dashboard/
router.get('/current-member', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  const member = await getCurrentMember(auth0Id)
  res.json(member)
})

// GET '/api/v1/dashboard'
router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const memberSubscription = await getMembersSubscriptionById(id)
    res.json(memberSubscription)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: 'There was an error getting your subscriptions',
    })
  }
})

export default router
