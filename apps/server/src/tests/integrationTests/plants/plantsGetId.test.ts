import request from 'supertest'
import { app } from '../../../server'
import prisma from '../../../helperFunctions/setupPrisma'
import bcrypt from 'bcrypt'

describe('Plant GET by id endpoint', () => {
  beforeEach(async () => {
    const encryptedPassword = await bcrypt.hash('Password123', 10)
    await prisma.user.create({
      data: {
        email: 'test_user',
        password: encryptedPassword,
      },
    })

    await prisma.plant.createMany({
      data: [
        {
          id: 1,
          name: 'Test plant 1',
          nickName: 'Cool nickname',
          image: 'plant1.jpg',
          latinName: 'Plantus testus 1',
          email: 'test_user',
          minCo2: 100,
          maxCo2: 200,
          minHumidity: 10,
          maxHumidity: 20,
          minTemperature: 10,
          maxTemperature: 20,
        },
        {
          id: 2,
          name: 'Test plant 2',
          nickName: 'Cool nickname 2',
          image: 'plant2.jpg',
          latinName: 'Plantus testus 2',
          email: 'test_user',
          minCo2: 100,
          maxCo2: 200,
          minHumidity: 10,
          maxHumidity: 20,
          minTemperature: 10,
          maxTemperature: 20,
        },
      ],
    })
  })

  afterEach(async () => {
    await prisma.user.deleteMany()

    await prisma.plant.deleteMany()
  })

  test('returns a successful response with status code 200 and specific plant with extended schema if user is authorized and has plant with passed id', async () => {
    const user = {
      username: 'test_user',
      password: 'Password123',
    }

    // Login the user first
    const loginResponse = await request(app).get('/api/v1/users').query(user)

    // Check that the login was successful
    expect(loginResponse.status).toBe(200)
    expect(loginResponse.body.message).toBe('User successfully logged in')
    expect(loginResponse.body.status).toBe('success')

    // Retrieve the plants after the user is logged in
    const response = await request(app)
      .get('/api/v1/plants/1')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      id: 1,
      name: 'Test plant 1',
      nickName: 'Cool nickname',
      image: 'plant1.jpg',
      latinName: 'Plantus testus 1',
      idealEnvironment: {
        minCo2: 100,
        maxCo2: 200,
        minHumidity: 10,
        maxHumidity: 20,
        minTemperature: 10,
        maxTemperature: 20,
      },
    })
  })

  test('returns an error response with status code 401 if user is not authorized', async () => {
    const response = await request(app).get('/api/v1/plants')

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
    expect(response.body.status).toBe('error')
  })

  test('returns an error response with status code 400 if failed to fetch plant', async () => {
    const user = {
      username: 'test_user',
      password: 'Password123',
    }

    // Login the user first
    const loginResponse = await request(app).get('/api/v1/users').query(user)

    // Check that the login was successful
    expect(loginResponse.status).toBe(200)
    expect(loginResponse.body.message).toBe('User successfully logged in')
    expect(loginResponse.body.status).toBe('success')

    // Delete all plants from the database
    await prisma.plant.deleteMany()

    // Retrieve the plants after the user is logged in
    const response = await request(app)
      .get('/api/v1/plants/1')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)

    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Plant was not found')
    expect(response.body.status).toBe('error')
  })

  test('returns an error response with status code 404 if user is authorized but plant does not exist', async () => {
    const user = {
      username: 'test_user',
      password: 'Password123',
    }
    // Login the user first
    const loginResponse = await request(app).get('/api/v1/users').query(user)

    // Check that the login was successful
    expect(loginResponse.status).toBe(200)
    expect(loginResponse.body.message).toBe('User successfully logged in')
    expect(loginResponse.body.status).toBe('success')

    // Retrieve the plant after the user is logged in
    const response = await request(app)
      .get('/api/v1/plants/999')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)

    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Plant was not found')
    expect(response.body.status).toBe('error')
  })
})
