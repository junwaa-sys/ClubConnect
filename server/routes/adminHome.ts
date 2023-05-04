import db from '../db/adminHome'
import { Router } from 'express'
import checkJwt from '../auth0'
import { JwtRequest } from '../auth0'
import 'dotenv/config'

const router = Router()
const bodyParser = require('body-parser')
router.use(bodyParser.json())
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// GET API/V1/ADMIN-HOME
router.get('/activity', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    if (!auth0Id) {
      console.error('not authenticated')
      return res.sendStatus(401)
    }
    const activity = await db.getActivity()
    return res.json(activity)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

// GET API/V1/ADMIN-HOME
router.get('/expiry-dates', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    if (!auth0Id) {
      console.error('not authenticated')
      return res.sendStatus(401)
    }
   

    const expiryDate = await db.getExpiryDates()
    return res.json(expiryDate)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

// POST API/V1/ADMIN-HOME
router.post('/send-email', async (req, res) => {
  try {
    const { email, subject, content } = req.body

    const msg = {
      to: email,
      from: 'tohora23.connect@gmail.com',
      subject: subject,
      text: content,
    }

    await sgMail.send(msg)
    res.send('Email send successfully')
  } catch (error) {
    console.log(error)
    res.status(500).send('Error occured while sending email')
  }
})

export default router
