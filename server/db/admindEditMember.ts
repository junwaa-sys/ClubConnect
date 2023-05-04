import { MemberProfile } from '../../models/memberSubscription'
import connection from './connection'

export function updateMemberProfile(
  id: string,
  memberProfile: MemberProfile,
  db = connection
) {
  return db('member_profiles').where('auth0_id', id).update(memberProfile)
}
