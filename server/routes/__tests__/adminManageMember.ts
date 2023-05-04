import request from 'supertest'
import server from '../../server'
import db from '../../db/adminManageMember'
import checkJwt, { JwtRequest } from '../../auth0'

jest.mock('../../auth0')
jest.mock('../../db/adminManageMember')

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

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

const mockMemberList = [
  {
    memberId: 1,
    memberName: 'Daniel',
    memberAddress: '',
    memberPhone: '',
    emergencyContact: '',
    emergencyPhone: '',
    memberEmail: '',
    concessionQty: 0,
    subscriptionName: 'Weekly',
    createdAt: '2023-04-16',
    checkinId: 1,
    renewalDate: '2023-04-16T13:00.00Z',
  },
]

const mockAddedReturn = [
  {
    id: 1,
    created_at: new Date(),
  },
]

const mockDeletedRow = 1

describe('GET /api/v1/manage-member/member-list', () => {
  it('should return list of member', async () => {
    expect.assertions(2)

    await mockJwt(mockSub)
    jest.mocked(db.getMemberList).mockResolvedValue(mockMemberList)

    const response = await request(server).get(
      '/api/v1/admin-manage-member/member-list'
    )

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockMemberList)
  })
  it('should return status 500 when db function fails', async () => {
    expect.assertions(1)

    mockJwt(mockSub)

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.getMemberList).mockRejectedValue(new Error('error'))

    const response = await request(server).get(
      '/api/v1/admin-manage-member/member-list'
    )

    expect(response.status).toBe(500)
  })
  it('should return status 401 and not authenticated message', async () => {
    expect.assertions(2)

    mockJwt('')

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.getMemberList).mockResolvedValue(mockMemberList)

    const response = await request(server).get(
      '/api/v1/admin-manage-member/member-list'
    )

    expect(response.status).toBe(401)
    expect(response.text).toBe('Unauthorized')
  })
})

describe('POST /api/v1/manage-member/check-in', () => {
  it('should return added checkin id and created_at timestemp', async () => {
    expect.assertions(3)

    await mockJwt(mockSub)
    jest.mocked(db.recordCheckin).mockResolvedValue(mockAddedReturn)

    const response = await request(server).post(
      '/api/v1/admin-manage-member/check-in'
    )
    const dateFormate = new Date(response.body[0].created_at)
    expect(response.status).toBe(200)
    expect(dateFormate).toEqual(mockAddedReturn[0].created_at)
    expect(response.body[0].id).toEqual(mockAddedReturn[0].id)
  })
  it('should return status 500 when db function fails', async () => {
    expect.assertions(1)

    mockJwt(mockSub)

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.recordCheckin).mockRejectedValue(new Error('error'))

    const response = await request(server).post(
      '/api/v1/admin-manage-member/check-in'
    )

    expect(response.status).toBe(500)
  })
  it('should return status 401 and not authenticated message', async () => {
    expect.assertions(2)

    mockJwt('')

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.recordCheckin).mockResolvedValue(mockAddedReturn)

    const response = await request(server).post(
      '/api/v1/admin-manage-member/check-in'
    )

    expect(response.status).toBe(401)
    expect(response.text).toBe('Unauthorized')
  })
})

describe('DELETE /api/v1/manage-member/delete-checkin', () => {
  it('should return deleted checkin id', async () => {
    expect.assertions(2)

    await mockJwt(mockSub)
    jest.mocked(db.deleteCheckin).mockResolvedValue(mockDeletedRow)

    const response = await request(server).delete(
      '/api/v1/admin-manage-member/delete-checkin'
    )

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockDeletedRow)
  })
  it('should return status 500 when db function fails', async () => {
    expect.assertions(1)

    mockJwt(mockSub)

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.deleteCheckin).mockRejectedValue(new Error('error'))

    const response = await request(server).delete(
      '/api/v1/admin-manage-member/delete-checkin'
    )

    expect(response.status).toBe(500)
  })
  it('should return status 401 and not authenticated message', async () => {
    expect.assertions(2)

    mockJwt('')

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.deleteCheckin).mockResolvedValue(mockDeletedRow)

    const response = await request(server).delete(
      '/api/v1/admin-manage-member/delete-checkin'
    )

    expect(response.status).toBe(401)
    expect(response.text).toBe('Unauthorized')
  })
})
