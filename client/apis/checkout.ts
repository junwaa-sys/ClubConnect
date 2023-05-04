import request from 'superagent'

async function initiateCheckoutSession(
  subscriptionId: number,
  memberId: string | undefined,
  token: string
) {
  try {
    const response = await request
      .post('/api/v1/checkout/initiate-checkout')
      .send({ subscriptionId, memberId })
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (err) {
    return new Error('Something went wrong')
  }
}

async function initiateCheckoutPortal(subscriptionId: number, token: string) {
  try {
    const response = await request
      .post('/api/v1/checkout/manage-subscription')
      .set('Authorization', `Bearer ${token}`)
      .send({ subscriptionId: subscriptionId })
    return response.body
  } catch (err) {
    return new Error('Something went wrong')
  }
}

export default { initiateCheckoutSession, initiateCheckoutPortal }
