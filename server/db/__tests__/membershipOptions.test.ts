import testConnection from '../connection'
import db from '../membershipOptions'

beforeAll(() => {
  return testConnection.migrate.latest()
})

beforeEach(() => {
  return testConnection.seed.run()
})

afterAll(() => {
  return testConnection.destroy()
})

describe('getSubscriptionById', () => {
  it('should get a single subscription when passed a valid id', async () => {
    const actual = await db.getSubscriptionById(2, testConnection)
    expect(actual.name).toBe('Monthly')
    expect(actual.is_published).toBe(1)
    expect(actual.price).toBe(100.0)
  })
  it('should return an empty object if no matching subscription is found', async () => {
    const actual = await db.getSubscriptionById(45, testConnection)
    expect(actual).toBeUndefined()
  })
})

describe('getPublishedSubscriptions', () => {
  it('should get subscriptions that are published and not archived', async () => {
    const actual = await db.getPublishedSubscriptions(testConnection)
    expect(actual[0].name).toBe('Weekly')
    expect(actual[1].cover_period).toBe('monthly')
    expect(actual[3]).toBeUndefined()
  })
  it('should return an empty array if no subscriptions are published and not archived', async () => {
    const subscriptions = await testConnection('subscriptions')
    const subsPromises = subscriptions.map(async (item) => {
      return testConnection('subscriptions')
        .where('id', item.id)
        .update({ is_published: 0, archived: 0 })
    })
    await Promise.all(subsPromises)
    const actual = await db.getPublishedSubscriptions(testConnection)
    expect(actual).toHaveLength(0)
  })
})

describe('getAllSubscriptions', () => {
  it('should get all subscriptions', async () => {
    const actual = await db.getAllSubscriptions(testConnection)
    expect(actual).toHaveLength(3)
  })
  it('should return all options even if they are archived or unpublished', async () => {
    const actual = await db.getAllSubscriptions(testConnection)
    expect(actual[2].is_published).toBe(0)
    expect(actual).toHaveLength(3)
  })
  it('should return an empty array if no subscriptions exist', async () => {
    await testConnection('subscriptions').del()
    const actual = await db.getAllSubscriptions(testConnection)
    expect(actual).toHaveLength(0)
  })
})

describe('addSubscription', () => {
  it('should add a subscription type to the DB', async () => {
    const newOption = {
      name: 'Test',
      cover_period: 'Test',
      is_published: true,
      price: 123,
      stripe_product: 'randomstring1',
      stripe_price: 'randomstring2',
      is_active: false,
      default_concessions: 21,
      archived: false,
    }
    await db.addSubscription(newOption, testConnection)
    const actual = await db.getAllSubscriptions(testConnection)
    expect(actual).toHaveLength(4)
    expect(actual[3].name).toBe('Test')
    expect(actual[3].cover_period).toBe('Test')
    expect(actual[3].default_concessions).toBe(21)
  })
})

describe('updateSubscription', () => {
  it('should update a subscription in  the DB', async () => {
    const updatedOption = {
      id: 2,
      name: 'Test',
      cover_period: 'Test',
      is_published: true,
      price: 123,
      stripe_product: 'randomstring1',
      stripe_price: 'randomstring2',
      is_active: false,
      default_concessions: 21,
      archived: false,
    }
    await db.updateSubscription(updatedOption, testConnection)
    const actual = await testConnection('subscriptions').where('id', 2)
    expect(actual).toHaveLength(1)
    expect(actual[0].name).toBe('Test')
    expect(actual[0].cover_period).toBe('Test')
    expect(actual[0].default_concessions).toBe(21)
  })
})

describe('archiveSubscription', () => {
  it('should set archived to true for a given id', async () => {
    await db.archiveSubscription(2, testConnection)
    const actual = await testConnection('subscriptions')
      .select()
      .where('id', 2)
      .first()
    expect(actual.archived).toBe(1)
  })
})

describe('restoreSubscription', () => {
  it('should set archived to false for a given id', async () => {
    await testConnection('subscriptions')
      .where('id', 2)
      .update('archived', true)
    await db.restoreSubscription(2, testConnection)
    const actual = await testConnection('subscriptions')
      .select()
      .where('id', 2)
      .first()
    expect(actual.archived).toBe(0)
  })
})

describe('deleteSubscription', () => {
  it('should set remove a subscription from the DB', async () => {
    await db.deleteSubscription(1, testConnection)
    const actual = await testConnection('subscriptions')
    expect(actual).toHaveLength(2)
  })
})
