import request from 'supertest'
import server from '../../server'
import db from '../../db/adminHome'
import checkJwt, { JwtRequest } from '../../auth0'

jest.mock('../../db/adminHome')
jest.mock('../../auth0')

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const mockActivityData = [
  {
    memberId: 1,
    memberName: 'Daniel',
    subscriptionsName: 'Weekly',
    renewalDate: '2023-04-15',
    concessionQty: 0,
    count: 1,
  },
]

const mockExpiryData = [
  {
    memberId: 1,
    memberName: 'Daniel',
    renewalDate: '2023-04-15',
    concessionQty: 0,
  },
  {
    memberId: 2,
    memberName: 'Rueben',
    renewalDate: '2023-04-20',
    concessionQty: 0,
  },
]

function mockJwt(sub: string) {
  jest.mocked(checkJwt).mockImplementation(async (req, res, next) => {
    const reqAuth = req as JwtRequest
    reqAuth.auth = {
      sub: sub,
    }
    next()
  })
}
const mockSub = 'auth0|123'

describe('GET /api/v1/admin-home/activity', () => {
  it('should return activity data', async () => {
    expect.assertions(2)

    await mockJwt(mockSub)
    jest.mocked(db.getActivity).mockResolvedValue(mockActivityData)

    const response = await request(server).get('/api/v1/admin-home/activity')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockActivityData)
  })

  it('should return status 500 when db function fails', async () => {
    expect.assertions(1)

    mockJwt(mockSub)

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.getActivity).mockRejectedValue(new Error('error'))

    const response = await request(server).get('/api/v1/admin-home/activity')

    expect(response.status).toBe(500)
  })

  it('should return status 401 and not authenticated message', async () => {
    expect.assertions(2)

    mockJwt('')

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.getActivity).mockResolvedValue(mockActivityData)

    const response = await request(server).get('/api/v1/admin-home/activity')

    expect(response.status).toBe(401)
    expect(response.text).toBe('Unauthorized')
  })
})

describe('GET /api/v1/admin-home/expiry-dates', () => {
  it('should return member list with expiry dates', async () => {
    expect.assertions(2)

    await mockJwt(mockSub)
    jest.mocked(db.getExpiryDates).mockResolvedValue(mockExpiryData)

    const response = await request(server).get(
      '/api/v1/admin-home/expiry-dates'
    )

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockExpiryData)
  })
  it('should return status 500 when db function fails', async () => {
    expect.assertions(1)

    mockJwt(mockSub)

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.getExpiryDates).mockRejectedValue(new Error('error'))

    const response = await request(server).get(
      '/api/v1/admin-home/expiry-dates'
    )

    expect(response.status).toBe(500)
  })
  it('should return status 401 and not authenticated message', async () => {
    expect.assertions(2)

    mockJwt('')

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.getExpiryDates).mockResolvedValue(mockExpiryData)

    const response = await request(server).get(
      '/api/v1/admin-home/expiry-dates'
    )

    expect(response.status).toBe(401)
    expect(response.text).toBe('Unauthorized')
  })
})
