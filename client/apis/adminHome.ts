import request from 'superagent'
import * as models from '../../models/adminHome'

async function getActivity(token: string) {
  const response = await request
    .get('/api/v1/admin-home/activity')
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

async function getExpiryDates(token: string) {
  const response = await request
    .get('/api/v1/admin-home/expiry-dates')
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

async function sendEmail(emailBody: models.EmailBody) {
  const response = await request
    .post('/api/v1/admin-home/send-email')
    .send(emailBody)
  return response.body
}
export default { getActivity, getExpiryDates, sendEmail }
