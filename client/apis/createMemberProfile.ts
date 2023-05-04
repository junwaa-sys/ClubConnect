import request from 'superagent'
import { MemberProfile } from '../../models/memberSubscription'

export async function createMemberProfile(memberProfile: MemberProfile) {
  const response = await request.post(`/api/v1/dashboard`).send(memberProfile)
  return response.body
}
