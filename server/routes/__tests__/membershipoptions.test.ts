import request from 'supertest'
import checkJwt from '../../auth0'
import { JwtRequest } from '../../auth0'
import server from '../../server'
import db from '../../db/membershipOptions'

jest.mock('../../db/membershipOptions')
jest.mock('../../auth0')

jest.mocked(checkJwt).mockImplementation(async (req: JwtRequest, res, next) => {
  req.auth = {
    sub: 'Auth0|1234',
  }
  next()
})

describe('GET /api/v1/membership-options', () => {
  it('should return a list subscriptions from the DB', async () => {
    const subs = [
      {
        id: 1,
        name: 'test1',
        cover_period: 'test1',
        is_published: 1,
        price: 15.0,
        stripe_product: 'test1',
        stripe_price: 'test1',
        is_active: 1,
        default_concessions: 2,
        archived: 0,
      },
      {
        id: 2,
        name: 'test2',
        cover_period: 'test2',
        is_published: 1,
        price: 100.0,
        stripe_product: 'test2',
        stripe_price: 'test2',
        is_active: 0,
        default_concessions: 8,
        archived: 0,
      },
      {
        id: 3,
        name: 'test3',
        cover_period: 'test3',
        is_published: 0,
        price: 150.0,
        stripe_product: 'test3',
        stripe_price: 'test3',
        is_active: 0,
        default_concessions: 10,
        archived: 0,
      },
    ]

    jest.mocked(db.getPublishedSubscriptions).mockResolvedValue(subs)
    const expected = await request(server).get('/api/v1/membership-options')
    expect(expected.body).toEqual(subs)
    expect(expected.body).toHaveLength(3)
  })
  it('should return an error message if the request fails', async () => {
    jest
      .mocked(db.getPublishedSubscriptions)
      .mockRejectedValue({ message: 'Something went wrong' })
    const expected = await request(server).get('/api/v1/membership-options')
    expect(expected.body.message).toBe(
      'Could not retrieve subscriptions from the database. Try again later.'
    )
  })
})

describe('GET /api/v1/admin/membership-options', () => {
  it('should get all subscriptions from the db', async () => {
    const subs = [
      {
        id: 1,
        name: 'test1',
        cover_period: 'test1',
        is_published: 1,
        price: 15.0,
        stripe_product: 'test1',
        stripe_price: 'test1',
        is_active: 1,
        default_concessions: 2,
        archived: 0,
      },
      {
        id: 2,
        name: 'test2',
        cover_period: 'test2',
        is_published: 1,
        price: 100.0,
        stripe_product: 'test2',
        stripe_price: 'test2',
        is_active: 0,
        default_concessions: 8,
        archived: 0,
      },
      {
        id: 3,
        name: 'test3',
        cover_period: 'test3',
        is_published: 0,
        price: 150.0,
        stripe_product: 'test3',
        stripe_price: 'test3',
        is_active: 0,
        default_concessions: 10,
        archived: 0,
      },
    ]

    jest.mocked(db.getAllSubscriptions).mockResolvedValue(subs)
    const expected = await request(server).get(
      '/api/v1/admin/membership-options'
    )
    expect(expected.body).toEqual(subs)
    expect(expected.body).toHaveLength(3)
  })
  it('should return an error message if the request fails', async () => {
    jest
      .mocked(db.getAllSubscriptions)
      .mockRejectedValue({ message: 'Something went wrong' })
    const expected = await request(server).get(
      '/api/v1/admin/membership-options'
    )
    expect(expected.body.message).toBe(
      'Could not retrieve subscriptions from the database. Try again later.'
    )
  })
})

describe('POST /api/v1/admin/membership-options', () => {
  const subs = [
    {
      id: 1,
      name: 'test1',
      cover_period: 'test1',
      is_published: 1,
      price: 15.0,
      stripe_product: 'test1',
      stripe_price: 'test1',
      is_active: 1,
      default_concessions: 2,
      archived: 0,
    },
    {
      id: 2,
      name: 'test2',
      cover_period: 'test2',
      is_published: 1,
      price: 100.0,
      stripe_product: 'test2',
      stripe_price: 'test2',
      is_active: 0,
      default_concessions: 8,
      archived: 0,
    },
    {
      id: 3,
      name: 'test3',
      cover_period: 'test3',
      is_published: 0,
      price: 150.0,
      stripe_product: 'test3',
      stripe_price: 'test3',
      is_active: 0,
      default_concessions: 10,
      archived: 0,
    },
  ]
  const newSub = {
    id: 3,
    name: 'test3',
    cover_period: 'test3',
    is_published: 0,
    price: 150.0,
    stripe_product: 'test3',
    stripe_price: 'test3',
    is_active: 0,
    default_concessions: 10,
    archived: 0,
  }
  it('should add a subscription to the database and return the new list', async () => {
    jest.mocked(db.addSubscription).mockResolvedValue([3])
    jest.mocked(db.getAllSubscriptions).mockResolvedValue(subs)

    const expected = await request(server)
      .post('/api/v1/admin/membership-options')
      .send(newSub)

    expect(expected.body).toHaveLength(3)
    expect(expected.body).toEqual(subs)
  })
  it('should return an error message if the request fails to add to the database', async () => {
    jest.mocked(db.addSubscription).mockRejectedValue('Failed')
    jest.mocked(db.getAllSubscriptions).mockResolvedValue(subs)

    const expected = await request(server)
      .post('/api/v1/admin/membership-options')
      .send(newSub)

    expect(expected.body.message).toBe(
      'Something went wrong. Please refresh the page and try again.'
    )
  })
  it('should return an error message if the request fails to return the subscriptions from the database', async () => {
    jest.mocked(db.addSubscription).mockResolvedValue([4])
    jest.mocked(db.getAllSubscriptions).mockRejectedValue('failed')

    const expected = await request(server)
      .post('/api/v1/admin/membership-options')
      .send(newSub)

    expect(expected.body.message).toBe(
      'Something went wrong. Please refresh the page and try again.'
    )
  })
})

describe('PATCH /api/v1/admin/membership-options', () => {
  const subs = [
    {
      id: 1,
      name: 'test1',
      cover_period: 'test1',
      is_published: 1,
      price: 15.0,
      stripe_product: 'test1',
      stripe_price: 'test1',
      is_active: 1,
      default_concessions: 2,
      archived: 0,
    },
    {
      id: 2,
      name: 'test2',
      cover_period: 'test2',
      is_published: 1,
      price: 100.0,
      stripe_product: 'test2',
      stripe_price: 'test2',
      is_active: 0,
      default_concessions: 8,
      archived: 0,
    },
    {
      id: 3,
      name: 'test3',
      cover_period: 'test3',
      is_published: 0,
      price: 150.0,
      stripe_product: 'test3',
      stripe_price: 'test3',
      is_active: 0,
      default_concessions: 10,
      archived: 0,
    },
  ]
  const newSub = {
    id: 3,
    name: 'test3',
    cover_period: 'test3',
    is_published: 0,
    price: 150.0,
    stripe_product: 'test3',
    stripe_price: 'test3',
    is_active: 0,
    default_concessions: 10,
    archived: 0,
  }
  it('should return an updated list of subscriptions from the database after one is updated', async () => {
    jest.mocked(db.updateSubscription).mockResolvedValue(3)
    jest.mocked(db.getAllSubscriptions).mockResolvedValue(subs)

    const expected = await request(server)
      .patch('/api/v1/admin/membership-options')
      .send(newSub)

    expect(expected.body).toHaveLength(3)
    expect(expected.body).toEqual(subs)
  })
  it('should return an error message if the request fails to update the database', async () => {
    jest.mocked(db.updateSubscription).mockRejectedValue('Failed')
    jest.mocked(db.getAllSubscriptions).mockResolvedValue(subs)

    const expected = await request(server)
      .patch('/api/v1/admin/membership-options')
      .send(newSub)

    expect(expected.body.message).toBe(
      'Something went wrong. Please refresh the page and try again.'
    )
  })
  it('should return an error message if the request fails to return the subscriptions from the database', async () => {
    jest.mocked(db.updateSubscription).mockResolvedValue(4)
    jest.mocked(db.getAllSubscriptions).mockRejectedValue('failed')

    const expected = await request(server)
      .patch('/api/v1/admin/membership-options')
      .send(newSub)

    expect(expected.body.message).toBe(
      'Something went wrong. Please refresh the page and try again.'
    )
  })
})

describe('PATCH /api/v1/admin/membership-options/archive', () => {
  const subs = [
    {
      id: 1,
      name: 'test1',
      cover_period: 'test1',
      is_published: 1,
      price: 15.0,
      stripe_product: 'test1',
      stripe_price: 'test1',
      is_active: 1,
      default_concessions: 2,
      archived: 0,
    },
    {
      id: 2,
      name: 'test2',
      cover_period: 'test2',
      is_published: 1,
      price: 100.0,
      stripe_product: 'test2',
      stripe_price: 'test2',
      is_active: 0,
      default_concessions: 8,
      archived: 0,
    },
    {
      id: 3,
      name: 'test3',
      cover_period: 'test3',
      is_published: 0,
      price: 150.0,
      stripe_product: 'test3',
      stripe_price: 'test3',
      is_active: 0,
      default_concessions: 10,
      archived: 0,
    },
  ]
  const newSub = {
    id: 3,
    name: 'test3',
    cover_period: 'test3',
    is_published: 0,
    price: 150.0,
    stripe_product: 'test3',
    stripe_price: 'test3',
    is_active: 0,
    default_concessions: 10,
    archived: 0,
  }
  it('should return an updated list of subscriptions from the database after one is updated', async () => {
    jest.mocked(db.archiveSubscription).mockResolvedValue(3)
    jest.mocked(db.getAllSubscriptions).mockResolvedValue(subs)

    const expected = await request(server)
      .patch('/api/v1/admin/membership-options/archive')
      .send(newSub)

    expect(expected.body).toHaveLength(3)
    expect(expected.body).toEqual(subs)
  })
  it('should return an error message if the request fails to update the database', async () => {
    jest.mocked(db.archiveSubscription).mockRejectedValue('Failed')
    jest.mocked(db.getAllSubscriptions).mockResolvedValue(subs)

    const expected = await request(server)
      .patch('/api/v1/admin/membership-options/archive')
      .send(newSub)

    expect(expected.body.message).toBe(
      'Something went wrong. Please refresh the page and try again.'
    )
  })
  it('should return an error message if the request fails to return the subscriptions from the database', async () => {
    jest.mocked(db.archiveSubscription).mockResolvedValue(4)
    jest.mocked(db.getAllSubscriptions).mockRejectedValue('failed')

    const expected = await request(server)
      .patch('/api/v1/admin/membership-options/archive')
      .send(newSub)

    expect(expected.body.message).toBe(
      'Something went wrong. Please refresh the page and try again.'
    )
  })
})

describe('PATCH /api/v1/admin/membership-options/restore', () => {
  const subs = [
    {
      id: 1,
      name: 'test1',
      cover_period: 'test1',
      is_published: 1,
      price: 15.0,
      stripe_product: 'test1',
      stripe_price: 'test1',
      is_active: 1,
      default_concessions: 2,
      archived: 0,
    },
    {
      id: 2,
      name: 'test2',
      cover_period: 'test2',
      is_published: 1,
      price: 100.0,
      stripe_product: 'test2',
      stripe_price: 'test2',
      is_active: 0,
      default_concessions: 8,
      archived: 0,
    },
    {
      id: 3,
      name: 'test3',
      cover_period: 'test3',
      is_published: 0,
      price: 150.0,
      stripe_product: 'test3',
      stripe_price: 'test3',
      is_active: 0,
      default_concessions: 10,
      archived: 0,
    },
  ]
  const newSub = {
    id: 3,
    name: 'test3',
    cover_period: 'test3',
    is_published: 0,
    price: 150.0,
    stripe_product: 'test3',
    stripe_price: 'test3',
    is_active: 0,
    default_concessions: 10,
    archived: 0,
  }
  it('should return an updated list of subscriptions from the database after one is updated', async () => {
    jest.mocked(db.restoreSubscription).mockResolvedValue(3)
    jest.mocked(db.getAllSubscriptions).mockResolvedValue(subs)

    const expected = await request(server)
      .patch('/api/v1/admin/membership-options/restore')
      .send(newSub)

    expect(expected.body).toHaveLength(3)
    expect(expected.body).toEqual(subs)
  })
  it('should return an error message if the request fails to update the database', async () => {
    jest.mocked(db.restoreSubscription).mockRejectedValue('Failed')
    jest.mocked(db.getAllSubscriptions).mockResolvedValue(subs)

    const expected = await request(server)
      .patch('/api/v1/admin/membership-options/restore')
      .send(newSub)

    expect(expected.body.message).toBe(
      'Something went wrong. Please refresh the page and try again.'
    )
  })
  it('should return an error message if the request fails to return the subscriptions from the database', async () => {
    jest.mocked(db.restoreSubscription).mockResolvedValue(4)
    jest.mocked(db.getAllSubscriptions).mockRejectedValue('failed')

    const expected = await request(server)
      .patch('/api/v1/admin/membership-options/restore')
      .send(newSub)

    expect(expected.body.message).toBe(
      'Something went wrong. Please refresh the page and try again.'
    )
  })
})

describe('DELETE /api/v1/admin/membership-options/', () => {
  const subs = [
    {
      id: 1,
      name: 'test1',
      cover_period: 'test1',
      is_published: 1,
      price: 15.0,
      stripe_product: 'test1',
      stripe_price: 'test1',
      is_active: 1,
      default_concessions: 2,
      archived: 0,
    },
    {
      id: 2,
      name: 'test2',
      cover_period: 'test2',
      is_published: 1,
      price: 100.0,
      stripe_product: 'test2',
      stripe_price: 'test2',
      is_active: 0,
      default_concessions: 8,
      archived: 0,
    },
  ]

  it('should return an updated list of subscriptions from the database after one is updated', async () => {
    jest.mocked(db.deleteSubscription).mockResolvedValue(3)
    jest.mocked(db.getAllSubscriptions).mockResolvedValue(subs)

    const expected = await request(server)
      .delete('/api/v1/admin/membership-options')
      .send({ id: 3 })

    expect(expected.body).toHaveLength(2)
    expect(expected.body).toEqual(subs)
  })
  it('should return an error message if the request fails to update the database', async () => {
    jest.mocked(db.deleteSubscription).mockRejectedValue('Failed')
    jest.mocked(db.getAllSubscriptions).mockResolvedValue(subs)

    const expected = await request(server)
      .delete('/api/v1/admin/membership-options')
      .send({ id: 3 })

    expect(expected.body.message).toBe(
      'Something went wrong. Please refresh the page and try again.'
    )
  })
  it('should return an error message if the request fails to return the subscriptions from the database', async () => {
    jest.mocked(db.deleteSubscription).mockResolvedValue(4)
    jest.mocked(db.getAllSubscriptions).mockRejectedValue('failed')

    const expected = await request(server)
      .delete('/api/v1/admin/membership-options')
      .send({ id: 3 })

    expect(expected.body.message).toBe(
      'Something went wrong. Please refresh the page and try again.'
    )
  })
})
