import connection from '../connection'
import * as models from '../../../models/adminManageMember'
import db from '../adminManageMember'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

const currenDate = new Date()
const formattedDate = `${currenDate.getFullYear()}-${(currenDate.getMonth() + 1)
  .toString()
  .padStart(2, '0')}-${currenDate.getDate().toString().padStart(2, '0')}`

describe('getMemberList', () => {
  it('should return member list records from joined table created_at equals current date', async () => {
    const membercheckinList = await db.getMemberList()

    expect(membercheckinList).toHaveLength(3)
    expect(membercheckinList[0].createdAt).toBe(formattedDate)
    expect(membercheckinList[1].createdAt).toBe(formattedDate)
    expect(membercheckinList[2].createdAt).toBeNull()
  })
})

describe('recordCheckin', () => {
  it('should add checkin record', async () => {
    expect.assertions(1)
    const checkinMember = { member_id: 3 }
    const addedCheckin = await db.recordCheckin(checkinMember)
    const membercheckinList = await db.getMemberList()

    expect(addedCheckin[0].id).toBe(3)
    // expect(membercheckinList[2].createdAt).toBe(formattedDate)
  })
})

describe('deleteCheckin', () => {
  it('should delete checkin record with matching id', async () => {
    expect.assertions(1)
    const checkinId = 2

    const deletedCheckinId = await db.deleteCheckin(checkinId)
    const membercheckinList = await db.getMemberList()

    //number of row deleted should be 1 as there will be only 1 matching record
    expect(deletedCheckinId).toBe(1)
    // expect(membercheckinList[1].createdAt).toBeNull()
  })
})
