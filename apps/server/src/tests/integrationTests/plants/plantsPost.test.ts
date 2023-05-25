import request from 'supertest'
import { app } from '../../../server'
import prisma from '../../../helperFunctions/setupPrisma'
import bcrypt from 'bcrypt'

describe('Plant POST endpoint', () => {
  beforeEach(async () => {
    const encryptedPassword = await bcrypt.hash('Password123', 10)
    await prisma.user.create({
      data: {
        email: 'test_user',
        password: encryptedPassword,
      },
    })
  })

  afterEach(async () => {
    await prisma.plant.deleteMany()
    await prisma.user.deleteMany()
  })

  test('returns a successful response with status code 201 if plant is successfully registered', async () => {
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

    // Add the plant after the user is logged in
    const newPlant = {
      name: 'Test plant',
      nickName: 'A plant for testing',
      image: 'plant.jpg',
      latinName: 'Plantus testus',
      idealEnvironment: {
        minCo2: 100,
        maxCo2: 200,
        minHumidity: 10,
        maxHumidity: 20,
        minTemperature: 10,
        maxTemperature: 20,
      },
      wateringInterval: 7,
    }

    const response = await request(app)
      .post('/api/v1/plants')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(newPlant)

    const tasks = await prisma.task.findMany({
      where: {
        plantId: response.body.id,
      },
      orderBy: {
        daysTillDeadline: 'asc',
      },
    })

    expect(tasks.length).toBe(4)

    expect(tasks[0]).toMatchObject({
      plantId: response.body.plant.id,
      type: 'water',
      daysTillDeadline: 7,
      originalDeadline: 7,
    })

    expect(tasks[1]).toMatchObject({
      plantId: response.body.plant.id,
      type: 'water',
      daysTillDeadline: 14,
      originalDeadline: 7,
    })

    expect(tasks[2]).toMatchObject({
      plantId: response.body.plant.id,
      type: 'water',
      daysTillDeadline: 21,
      originalDeadline: 7,
    })

    expect(tasks[3]).toMatchObject({
      plantId: response.body.plant.id,
      type: 'water',
      daysTillDeadline: 28,
      originalDeadline: 7,
    })

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Plant successfully registered')
    expect(response.body.status).toBe('success')
    expect(response.body.plant).toMatchObject({
      name: 'Test plant',
      nickName: 'A plant for testing',
      image: 'plant.jpg',
      latinName: 'Plantus testus',
      minCo2: 100,
      maxCo2: 200,
      minHumidity: 10,
      maxHumidity: 20,
      minTemperature: 10,
      maxTemperature: 20,
      email: user.username,
    })
  })

  test('returns 400 status and error message when missing parameters', async () => {
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

    // Attempt to add a plant with missing parameters
    const newPlant = {
      name: 'Test plant',
      nickName: 'A plant for testing',
      image: 'plant.jpg',
    }

    const response = await request(app)
      .post('/api/v1/plants')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(newPlant)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Missing parameters to register a plant')
    expect(response.body.status).toBe('error')
  })
})
