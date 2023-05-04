import request from 'superagent'
import { MemberProfile } from '../../models/memberSubscription'

const url = '/api/v1/admin-manage-member'

export async function editMemberProfile(
  id: string,
  memberProfile: MemberProfile
) {
  try {
    const response = await request.patch(`${url}/${id}`).send(memberProfile)
    return response.body
  } catch (err) {
    console.error(err)
  }
}
