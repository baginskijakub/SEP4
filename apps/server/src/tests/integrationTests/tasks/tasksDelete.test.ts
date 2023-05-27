import request from 'supertest'
import prisma from '../../../helperFunctions/setupPrisma'
import bcrypt from 'bcrypt'
import { app } from '../../../server'

describe('Complete task endpoint', () => {
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
          id: 3,
          plantId: 1,
          type: 'water',
          daysTillDeadline: 7,
          originalDeadline: 7,
        },
        {
          id: 4,
          plantId: 1,
          type: 'water',
          daysTillDeadline: 14,
          originalDeadline: 7,
        },
        {
          id: 5,
          plantId: 1,
          type: 'water',
          daysTillDeadline: 21,
          originalDeadline: 7,
        },
        {
          id: 2,
          plantId: 1,
          type: 'fertilize',
          daysTillDeadline: 0,
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

  test('returns 400 status and error message when task id is not a number', async () => {
    const response = await request(app).delete('/api/v1/tasks/invalidId').set('Authorization', `Bearer ${authToken}`)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Invalid task id')
    expect(response.body.status).toBe('error')
  })

  test('returns 404 error if task with passed id does not exist', async () => {
    const response = await request(app).delete('/api/v1/tasks/6').set('Authorization', `Bearer ${authToken}`)

    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Task with passed id not found')
    expect(response.body.status).toBe('error')
  })

  test('returns 200 and refreshes days till deadline if type of task is water', async () => {
    const response = await request(app).delete(`/api/v1/tasks/1`).set('Authorization', `Bearer ${authToken}`)

    const tasks = await prisma.task.findMany({
      where: { plantId: 1, type: 'water' },
      orderBy: { daysTillDeadline: 'desc' },
    })

    expect(tasks.length).toBe(4)
    expect(tasks[0].daysTillDeadline).toBe(28)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: 1,
      plantId: 1,
      type: 'water',
      status: 'current',
      date: `to be completed today`,
    })
  })

  test('returns 200 and deletes task from if type of task is not water', async () => {
    const response = await request(app).delete(`/api/v1/tasks/2`).set('Authorization', `Bearer ${authToken}`)

    const tasks = await prisma.task.findMany()

    expect(tasks.length).toBe(4)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: 2,
      plantId: 1,
      type: 'fertilize',
      status: 'current',
      date: `to be completed today`,
    })
  })

  test('returns 401 status and error message when the user is not authenticated', async () => {
    const response = await request(app).delete(`/api/v1/tasks/`)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
    expect(response.body.status).toBe('error')
  })
})
