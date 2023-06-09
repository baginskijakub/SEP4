import request from 'supertest'
import prisma from '../../../helperFunctions/setupPrisma'
import bcrypt from 'bcrypt'
import { app } from '../../../server'

describe('Get environment by type endpoint', () => {
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

    //create plant so we can patch its environment
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

    const fakeGraphPoints = [
      {
        plantId: 1,
        dateEpoch: Math.floor(new Date().getTime() / 1000.0),
        value: 11.2,
        type: 'temperature',
      },
      {
        plantId: 1,
        dateEpoch: Math.floor(new Date().getTime() / 1000.0) + 3000,
        value: 14.2,
        type: 'temperature',
      },
      {
        plantId: 1,
        dateEpoch: Math.floor(new Date().getTime() / 1000.0) + 6000,
        value: 41.2,
        type: 'temperature',
      },
      {
        plantId: 1,
        dateEpoch: Math.floor(new Date().getTime() / 1000.0),
        value: 9.2,
        type: 'co2',
      },
    ]

    await prisma.graphData.createMany({
      data: fakeGraphPoints,
    })

    const loginResponse = await request(app).get('/api/v1/users').query({
      email: 'test_user',
      password: 'Password123',
    })

    authToken = loginResponse.body.token
  })

  afterEach(async () => {
    await prisma.plant.deleteMany()
    await prisma.user.deleteMany()
    await prisma.graphData.deleteMany()
  })

  //get, error 400, wrong type
  test('returns 400 status and error message if type is invalid', async () => {
    const response = await request(app)
      .get(`/api/v1/plants/${plantId}/environment/invalid_type`)
      .set('Authorization', `Bearer ${authToken}`)
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Wrong type')
    expect(response.body.status).toBe('error')
  })

  test('returns 401 status and error message when the user is not authenticated', async () => {
    const response = await request(app).get(`/api/v1/plants/${plantId}/environment/temperature`)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
    expect(response.body.status).toBe('error')
  })

  //reponse code 200, successfull path - temperature
  test('returns 200 status when the request is successful (temperature)', async () => {
    const response = await request(app)
      .get(`/api/v1/plants/${plantId}/environment/temperature`)
      .set('Authorization', `Bearer ${authToken}`)
    expect(response.status).toBe(200)
    expect(response.body['type']).toBeDefined()
    expect(response.body['data']).toBeDefined()
    expect(response.body['data'].length).toBe(3)
    expect(response.body['data'][0]['value']).toBe(11.2)
    expect(response.body['data'][0]['date']).toBeDefined()
    expect(response.body['data'][1]['value']).toBe(14.2)
    expect(response.body['data'][1]['date']).toBeDefined()
    expect(response.body['data'][2]['value']).toBe(41.2)
    expect(response.body['data'][2]['date']).toBeDefined()
    expect(response.body['type']).toBe('temperature')
  })

  //reponse code 200, successfull path - humidity
  test('returns 200 status when the request is successful (humidity)', async () => {
    const response = await request(app)
      .get(`/api/v1/plants/${plantId}/environment/humidity`)
      .set('Authorization', `Bearer ${authToken}`)
    expect(response.status).toBe(200)
    const expectedResponse = { data: [], type: 'humidity' }
    expect(response.body).toEqual(expectedResponse)
  })

  //response cod3 200, succesfull path - co2
  test('returns 200 status when the request is successful (co2)', async () => {
    const response = await request(app)
      .get(`/api/v1/plants/${plantId}/environment/co2`)
      .set('Authorization', `Bearer ${authToken}`)
    expect(response.status).toBe(200)
    expect(response.body['type']).toBeDefined()
    expect(response.body['data']).toBeDefined()
    expect(response.body['data'].length).toBe(1)
    expect(response.body['data'][0]['value']).toBe(9.2)
    expect(response.body['data'][0]['date']).toBeDefined()
    expect(response.body['type']).toBe('co2')
  })
})
