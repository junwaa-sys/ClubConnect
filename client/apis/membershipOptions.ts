import request from 'superagent'
import { Subscription } from '../../models/subscriptions'

async function fetchMembershipOptions(token: string) {
  const response = await request
    .get('/api/v1/membership-options')
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

async function fetchAllMembershipOptions(token: string) {
  const response = await request
    .get('/api/v1/admin/membership-options')
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

async function addMembershipOption(
  newOption: Partial<Subscription>,
  token: string
) {
  const response = await request
    .post('/api/v1/admin/membership-options')
    .set('Authorization', `Bearer ${token}`)
    .send(newOption)
  return response.body
}

async function updateMembershipOption(
  updatedOption: Partial<Subscription>,
  token: string
) {
  const response = await request
    .patch('/api/v1/admin/membership-options')
    .set('Authorization', `Bearer ${token}`)
    .send(updatedOption)
  return response.body
}

async function archiveMembershipOption(id: number, token: string) {
  const response = await request
    .patch('/api/v1/admin/membership-options/archive')
    .set('Authorization', `Bearer ${token}`)
    .send({ id })
  return response.body
}

async function restoreMembershipOption(id: number, token: string) {
  const response = await request
    .patch('/api/v1/admin/membership-options/restore')
    .set('Authorization', `Bearer ${token}`)
    .send({ id })
  return response.body
}

async function deleteMembershipOption(id: number, token: string) {
  const response = await request
    .delete('/api/v1/admin/membership-options/')
    .set('Authorization', `Bearer ${token}`)
    .send({ id })
  return response.body
}

export default {
  fetchMembershipOptions,
  fetchAllMembershipOptions,
  addMembershipOption,
  updateMembershipOption,
  archiveMembershipOption,
  restoreMembershipOption,
  deleteMembershipOption,
}
