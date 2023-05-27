import request from 'supertest'
import prisma from '../../../helperFunctions/setupPrisma'
import bcrypt from 'bcrypt'
import { app } from '../../../server'

describe('Get all tasks endpoint', () => {
  let authToken

  beforeEach(async () => {
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

    await prisma.task.createMany({
      data: [
        {
          id: 1,
          plantId: 1,
          type: 'water',
          daysTillDeadline: 0,
          originalDeadline: 7,
        },
        {
          id: 2,
          plantId: 1,
          type: 'fertilize',
          daysTillDeadline: 5,
          originalDeadline: 7,
        },
        {
          id: 3,
          plantId: 1,
          type: 'repot',
          daysTillDeadline: -6,
          originalDeadline: 7,
        },
        {
          id: 4,
          plantId: 1,
          type: 'repot',
          daysTillDeadline: 1,
          originalDeadline: 7,
        },
      ],
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
    await prisma.task.deleteMany()
  })

  test('returns 200 and empty array if the are no tasks in database', async () => {
    await prisma.task.deleteMany()
    const response = await request(app).get(`/api/v1/tasks`).set('Authorization', `Bearer ${authToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  test('returns 200 and empty array if the are no tasks connected to user sending the request', async () => {
    const encryptedPassword = await bcrypt.hash('Password123', 10)

    await prisma.user.create({
      data: {
        email: 'test_user2',
        password: encryptedPassword,
      },
    })

    const loginResponse = await request(app).get('/api/v1/users').query({
      email: 'test_user2',
      password: 'Password123',
    })
    authToken = loginResponse.body.token
    const response = await request(app).get(`/api/v1/tasks`).set('Authorization', `Bearer ${authToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  test('returns 200 and all the tasks from database with correct data', async () => {
    const response = await request(app).get(`/api/v1/tasks`).set('Authorization', `Bearer ${authToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(4)
    expect(response.body[0]).toEqual({
      id: 1,
      plantId: 1,
      type: 'water',
      status: 'current',
      date: 'to be completed today',
    })
    expect(response.body[1]).toEqual({
      id: 2,
      plantId: 1,
      type: 'fertilize',
      status: 'future',
      date: '5 days until deadline',
    })
    expect(response.body[2]).toEqual({
      id: 3,
      plantId: 1,
      type: 'repot',
      status: 'past',
      date: '6 days after deadline',
    })
    expect(response.body[3]).toEqual({
      id: 4,
      plantId: 1,
      type: 'repot',
      status: 'future',
      date: '1 day until deadline',
    })
  })

  test('returns 401 status and error message when the user is not authenticated', async () => {
    const response = await request(app).get(`/api/v1/tasks/`)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
    expect(response.body.status).toBe('error')
  })
})
