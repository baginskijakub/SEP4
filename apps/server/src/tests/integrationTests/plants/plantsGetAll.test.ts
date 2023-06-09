import request from 'supertest'
import { app } from '../../../server'
import prisma from '../../../helperFunctions/setupPrisma'
import bcrypt from 'bcrypt'

describe('Plant GET endpoint', () => {
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

    await prisma.task.createMany({
      data: [
        {
          plantId: 1,
          type: 'water',
          daysTillDeadline: 1,
          originalDeadline: 1,
        },
        {
          plantId: 1,
          type: 'water',
          daysTillDeadline: 2,
          originalDeadline: 1,
        },
        {
          plantId: 1,
          type: 'water',
          daysTillDeadline: 3,
          originalDeadline: 1,
        },
        {
          plantId: 1,
          type: 'water',
          daysTillDeadline: 4,
          originalDeadline: 1,
        },
        {
          plantId: 2,
          type: 'water',
          daysTillDeadline: 1,
          originalDeadline: 7,
        },
        {
          plantId: 2,
          type: 'water',
          daysTillDeadline: 8,
          originalDeadline: 7,
        },
        {
          plantId: 2,
          type: 'water',
          daysTillDeadline: 15,
          originalDeadline: 7,
        },
        {
          plantId: 2,
          type: 'water',
          daysTillDeadline: 22,
          originalDeadline: 7,
        },
      ],
    })
  })

  afterEach(async () => {
    await prisma.plant.deleteMany()
    await prisma.user.deleteMany()
    await prisma.task.deleteMany()
  })

  test('returns an error response with status code 401 if user is not authorized', async () => {
    const response = await request(app).get('/api/v1/plants')

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
    expect(response.body.status).toBe('error')
  })

  test('returns an error response with status code 400 if failed to fetch plants', async () => {
    const user = {
      email: 'test_user',
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
    const response = await request(app).get('/api/v1/plants').set('Authorization', `Bearer ${loginResponse.body.token}`)
    expect(response.status).toBe(200)
  })

  test('returns an error response with status code 401 if user is not authorized', async () => {
    const response = await request(app).get('/api/v1/plants')
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
    expect(response.body.status).toBe('error')
  })

  test('returns an error response with status code 400 if failed to fetch plants', async () => {
    const user = {
      email: 'test_user',
      password: 'Password123',
    }
    // Login the user first
    const loginResponse = await request(app).get('/api/v1/users').query(user)

    // Check that the login was successful
    expect(loginResponse.status).toBe(200)
    expect(loginResponse.body.message).toBe('User successfully logged in')
    expect(loginResponse.body.status).toBe('success')

    // Delete the user to create a failed fetch plants scenario
    await prisma.user.delete({ where: { email: user.email } })

    const response = await request(app).get('/api/v1/plants').set('Authorization', `Bearer ${loginResponse.body.token}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  test('returns a successful response with status code 200 and plants array if user is authorized and has plants', async () => {
    const user = {
      email: 'test_user',
      password: 'Password123',
    }
    // Login the user first
    const loginResponse = await request(app).get('/api/v1/users').query(user)

    // Check that the login was successful
    expect(loginResponse.status).toBe(200)
    expect(loginResponse.body.message).toBe('User successfully logged in')
    // Retrieve the plants after the user is logged in
    const response = await request(app).get('/api/v1/plants').set('Authorization', `Bearer ${loginResponse.body.token}`)

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(2)
    expect(response.body[0]).toMatchObject({
      name: 'Test plant 1',
      nickName: 'Cool nickname',
      image: 'plant1.jpg',
      latinName: 'Plantus testus 1',
      wateringInterval: 1,
    })
    expect(response.body[1]).toMatchObject({
      name: 'Test plant 2',
      nickName: 'Cool nickname 2',
      image: 'plant2.jpg',
      latinName: 'Plantus testus 2',
      wateringInterval: 7,
    })
  })
})
