import request from 'superagent'
import { MemberSubscription } from '../../models/memberSubscription'

export async function getMembersSubscriptionById(
  id: string
): Promise<MemberSubscription> {
  const response = await request.get(`/api/v1/dashboard/${id}`)
  return response.body
}

async function fetchCurrentMember(token: string) {
  const response = await request
    .get('/api/v1/dashboard/current-member')
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

export default { fetchCurrentMember }
