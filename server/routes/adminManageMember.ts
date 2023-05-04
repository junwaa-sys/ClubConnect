import db from '../db/adminManageMember'
import { Router } from 'express'
import checkJwt from '../auth0'
import { JwtRequest } from '../auth0'
import { updateMemberProfile } from '../db/admindEditMember'

const router = Router()

router.get('/member-list', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    if (!auth0Id) {
      console.error('not authenticated')
      return res.sendStatus(401)
    }
    const memberList = await db.getMemberList()
    return res.json(memberList)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

// /api/v1/admin-manage-member
router.patch('/:id', async (req, res) => {
  const memberProfile = req.body
  const { id } = req.params
  const updatedMemberProfile = {
    name: memberProfile.name,
    phone: memberProfile.phone,
    email: memberProfile.email,
    emergency_contact_name: memberProfile.emergency_contact_name,
    emergency_contact_phone: memberProfile.emergency_contact_phone,
    updated_at: Date.now(),
    address: memberProfile.address,
  }
  try {
    await updateMemberProfile(id, updatedMemberProfile)
    const memberList = await db.getMemberList()
    return res.json(memberList)
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
})

router.post('/check-in', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    if (!auth0Id) {
      console.error('not authenticated')
      return res.sendStatus(401)
    }
    const memberDetails = req.body

    const checkedinId = await db.recordCheckin(memberDetails, auth0Id)
    return res.json(checkedinId)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.delete('/delete-checkin', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    if (!auth0Id) {
      console.error('not authenticated')
      return res.sendStatus(401)
    }
    const checkinId = Number(req.body.id)
    const deletedCheckin = await db.deleteCheckin(checkinId)
    return res.json(deletedCheckin)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

export default router
