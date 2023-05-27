import request from 'supertest'
import { app } from '../../../server'
import prisma from '../../../helperFunctions/setupPrisma'
import bcrypt from 'bcrypt'

describe('Plant update watering tasks endpoint', () => {
  let authToken: string

  afterEach(async () => {
    await prisma.plant.deleteMany()
    await prisma.user.deleteMany()
    await prisma.task.deleteMany()
  })

  beforeEach(async () => {
    const user = {
      email: 'test_user',
      password: 'Password123',
    }

    const encryptedPassword = await bcrypt.hash('Password123', 10)
    await prisma.user.create({
      data: {
        email: 'test_user',
        password: encryptedPassword,
      },
    })

    await prisma.plant.create({
      data: {
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
    })

    await prisma.task.createMany({
      data: [
        {
          plantId: 1,
          type: 'water',
          daysTillDeadline: 2,
          originalDeadline: 7,
        },
        {
          plantId: 1,
          type: 'water',
          daysTillDeadline: 9,
          originalDeadline: 7,
        },
        {
          plantId: 1,
          type: 'water',
          daysTillDeadline: 16,
          originalDeadline: 7,
        },
        {
          plantId: 1,
          type: 'water',
          daysTillDeadline: 23,
          originalDeadline: 7,
        },
      ],
    })

    // Login the user and get the auth token
    const loginResponse = await request(app).get('/api/v1/users').query(user)
    authToken = loginResponse.body.token
  })

  test('returns a successful response with status code 200 if watering tasks were successfully updated', async () => {
    const response = await request(app)
      .patch(`/api/v1/plants/1/watering`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ watering: 9 })

    const tasks = await prisma.task.findMany({
      where: {
        plantId: 1,
      },
      orderBy: {
        daysTillDeadline: 'asc',
      },
    })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Watering interval updated')
    expect(response.body.status).toBe('success')
    expect(tasks.length).toBe(4)
    expect(tasks[0].daysTillDeadline).toBe(2)
    expect(tasks[0].originalDeadline).toBe(7)
    expect(tasks[1].daysTillDeadline).toBe(11)
    expect(tasks[1].originalDeadline).toBe(9)
    expect(tasks[2].daysTillDeadline).toBe(20)
    expect(tasks[2].originalDeadline).toBe(9)
    expect(tasks[3].daysTillDeadline).toBe(29)
    expect(tasks[3].originalDeadline).toBe(9)
  })

  test('returns 401 status and error message when failed to update watering tasks (not authorized user)', async () => {
    const response = await request(app).patch(`/api/v1/plants/1/watering`).send({ watering: 9 })

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
    expect(response.body.status).toBe('error')
  })

  test('returns 400 status and error message when failed to update watering tasks (invalid plant id)', async () => {
    const response = await request(app)
      .patch('/api/v1/plants/invalid_id/watering')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ watering: 9 })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Invalid plant id')
    expect(response.body.status).toBe('error')
  })

  test('returns 400 status and error message when failed to update watering tasks (invalid watering interval)', async () => {
    const response = await request(app)
      .patch('/api/v1/plants/1/watering')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ watering: 'invalid' })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Invalid watering interval')
    expect(response.body.status).toBe('error')
  })

  test('returns 400 status and error message when failed to update watering tasks (missing watering interval)', async () => {
    const response = await request(app).patch('/api/v1/plants/1/watering').set('Authorization', `Bearer ${authToken}`)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Invalid watering interval')
    expect(response.body.status).toBe('error')
  })

  test('returns 400 status and error message when failed to update watering tasks (negative watering interval)', async () => {
    const response = await request(app)
      .patch('/api/v1/plants/1/watering')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ watering: -1 })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Watering interval must be a positive number')
    expect(response.body.status).toBe('error')
  })
})
