import request from 'superagent'
import * as models from '../../models/adminManageMember'

async function getMemberList(token: string) {
  const response = await request
    .get('/api/v1/admin-manage-member/member-list')
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

async function recordCheckin(
  token: string,
  memberDetails: models.MemberList,
  currentDate: string
) {
  const response = await request
    .post('/api/v1/admin-manage-member/check-in')
    .set('Authorization', `Bearer ${token}`)
    .send({ ...memberDetails, currentDate })
  return response.body
}

async function deleteCheckin(token: string, checkinId: { id: number }) {
  const response = await request
    .delete('/api/v1/admin-manage-member/delete-checkin')
    .set('Authorization', `Bearer ${token}`)
    .send(checkinId)
  return response.body
}

export default { getMemberList, recordCheckin, deleteCheckin }
