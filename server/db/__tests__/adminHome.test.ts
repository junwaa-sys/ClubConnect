import connection from '../connection'
import * as models from '../../../models/adminHome'
import db from '../adminHome'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

describe('getActivity', () => {
  it('should return activity count based on checkin', async () => {
    expect.assertions(3)

    const activityList = await db.getActivity()

    expect(activityList).toHaveLength(2)
    expect(activityList[0].count).toBe(1)
    expect(activityList[1].count).toBe(1)
  })
})

describe('getExpiryDates', () => {
  it('should return renewal date for each members in order by renewal date', async () => {
    expect.assertions(4)

    const expiryDataList = await db.getExpiryDates()

    expect(expiryDataList).toHaveLength(3)
    expect(expiryDataList[0].renewalDate).toBe('2023-04-15')
    expect(expiryDataList[1].renewalDate).toBe('2023-04-20')
    expect(expiryDataList[2].renewalDate).toBe('2023-12-31')
  })
})
