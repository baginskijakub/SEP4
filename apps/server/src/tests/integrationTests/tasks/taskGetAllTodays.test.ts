import request from 'supertest'
import prisma from '../../../helperFunctions/setupPrisma'
import bcrypt from 'bcrypt'
import { app } from '../../../server'

describe('Get all todays tasks endpoint', () => {
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
          daysTillDeadline: 0,
          originalDeadline: 7,
        },
        {
          id: 3,
          plantId: 1,
          type: 'water',
          daysTillDeadline: 3,
          originalDeadline: 8,
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

  test('returns a successful response with status code 200 if tasks are successfully retrieved', async () => {
    const response = await request(app).get('/api/v1/tasks/current').set('Authorization', `Bearer ${authToken}`)

    expect(response.status).toBe(200)
    expect(response.body[0]).toMatchObject({
      id: 1,
      plantId: 1,
      type: 'water',
      status: 'current',
      date: 'to be completed today',
    })
    expect(response.body[1]).toMatchObject({
      id: 2,
      plantId: 1,
      type: 'fertilize',
      status: 'current',
      date: 'to be completed today',
    })
    expect(response.body.length).toBe(2)
  })

  test('returns 401 status and error message when failed to retrieve tasks (not authorized user)', async () => {
    const response = await request(app).get('/api/v1/tasks/current')

    expect(response.status).toBe(401)
    expect(response.body.status).toBe('error')
  })

  test('resturns 200 status and error message when failed to retrieve tasks (no tasks found)', async () => {
    await prisma.task.deleteMany()

    const response = await request(app).get('/api/v1/tasks/current').set('Authorization', `Bearer ${authToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  test('returns 200 status and error message when failed to retrieve tasks (no plants found)', async () => {
    await prisma.plant.deleteMany()

    const response = await request(app).get('/api/v1/tasks/current').set('Authorization', `Bearer ${authToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })
})
