import request from 'supertest'
import prisma from '../../../helperFunctions/setupPrisma'
import bcrypt from 'bcrypt'
import { app } from '../../../server'
import { sendDownlinkMessage } from '../../../businessLogic/lorawan/sendMessage'

jest.mock('../../../businessLogic/lorawan/sendMessage', () => ({
  ...jest.requireActual('../../../businessLogic/lorawan/sendMessage'),
  sendDownlinkMessage: jest.fn(() => console.log('mocked sending data')),
}))

describe('Patch environment', () => {
  let authToken
  let plantId

  beforeEach(async () => {
    const encryptedPassword = await bcrypt.hash('Password123', 10)
    await prisma.user.create({
      data: {
        email: 'test_user',
        password: encryptedPassword,
      },
    })

    const plant = await prisma.plant.create({
      data: {
        id: 1,
        name: 'Test plant',
        nickName: 'A plant for testing',
        image: 'plant.jpg',
        latinName: 'Plantus testus',
        email: 'test_user',
        minCo2: 100,
        maxCo2: 200,
        minHumidity: 10,
        maxHumidity: 20,
        minTemperature: 10,
        maxTemperature: 20,
      },
    })

    plantId = plant.id

    const loginResponse = await request(app).get('/api/v1/users').query({
      email: 'test_user',
      password: 'Password123',
    })

    authToken = loginResponse.body.token
  })

  afterEach(async () => {
    await prisma.plant.deleteMany()
    await prisma.user.deleteMany()
  })

  test('returns 400 status and error message when plant with passed id does not exists', async () => {
    const response = await request(app)
      .patch('/api/v1/plants/999/environment')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ humidity: 50, temperature: 25, co2: 800 })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Invalid plant id')
    expect(response.body.status).toBe('error')
  })

  //patch, error 400, missing ID
  test('returns 400 error if plantId is missing', async () => {
    const response = await request(app)
      .patch('/api/v1/plants/invalidId/environment')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ humidity: 50, temperature: 25, co2: 800 })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Invalid plant id')
    expect(response.body.status).toBe('error')
  })

  //patch, error 400, invalid desired environment
  test('returns a 400 error if value inside of desired environment is invalid', async () => {
    const response = await request(app)
      .patch(`/api/v1/plants/${plantId}/environment`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ humidity: 'invalid', temperature: 25, co2: 800 })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Invalid desired environment')
    expect(response.body.status).toBe('error')
  })

  test('returns a 400 error if desired environment is invalid', async () => {
    const response = await request(app)
      .patch(`/api/v1/plants/${plantId}/environment`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ humidity: 34.2, temperature: 25 })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Invalid desired environment')
    expect(response.body.status).toBe('error')
  })

  //patch, code 200, success
  test('sends a downlink message and returns a success response - 200', async () => {
    const response = await request(app)
      .patch(`/api/v1/plants/${plantId}/environment`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ humidity: 50, temperature: 25, co2: 800 })

    expect(response.status).toBe(200)
    expect(sendDownlinkMessage).toHaveBeenCalledTimes(1)
    expect(response.body.status).toBe('success')
    expect(response.body.payload).toBe('01f400fa0320')
  })

  test('returns 401 status and error message when the user is not authenticated', async () => {
    const response = await request(app).patch(`/api/v1/plants/${plantId}/environment`)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
    expect(response.body.status).toBe('error')
  })
})
