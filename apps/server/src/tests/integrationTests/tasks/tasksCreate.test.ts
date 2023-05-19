import request from 'supertest'
import prisma from '../../../helperFunctions/setupPrisma'
import bcrypt from 'bcrypt'
import { app } from '../../../server'
import { ITask } from '@sep4/types'

describe('Task POST endpoint', () => {
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

    const loginResponse = await request(app).get('/api/v1/users').query({
      username: 'test_user',
      password: 'Password123',
    })

    authToken = loginResponse.headers['set-cookie'][0].split(';')[0]
  })

  afterEach(async () => {
    await prisma.plant.deleteMany()
    await prisma.user.deleteMany()
    await prisma.task.deleteMany()
  })

  test('returns a successful response with status code 201 if task is successfully registered', async () => {
    const date = new Date()
    date.setDate(date.getDate() + 5)
    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const task: ITask = {
      id: 1,
      plantId: 1,
      type: 'water',
      status: 'future',
      date: dateString,
    }

    const taskResponse = await request(app).post('/api/v1/tasks').set('Cookie', authToken).send(task)

    expect(taskResponse.status).toBe(201)
    expect(taskResponse.body).toMatchObject({
      plantId: 1,
      type: 'water',
      status: 'future',
      date: '5 days until deadline',
    })
  })

  test('returns a error with status code 404 if plant with passed id does not exist', async () => {
    const date = new Date()
    date.setDate(date.getDate() + 5)
    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const task: ITask = {
      id: 1,
      plantId: 2,
      type: 'water',
      status: 'future',
      date: dateString,
    }

    const taskResponse = await request(app).post('/api/v1/tasks').set('Cookie', authToken).send(task)

    expect(taskResponse.status).toBe(404)
    expect(taskResponse.body.message).toEqual('Plant does not exist')
  })

  test('returns a error with status code 400 if task does not comply with ITask type', async () => {
    const date = new Date()
    date.setDate(date.getDate() + 5)
    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const task = {
      id: 1,
      plantId: 2,
      status: 'future',
      date: dateString,
    }

    const taskResponse = await request(app).post('/api/v1/tasks').set('Cookie', authToken).send(task)

    expect(taskResponse.status).toBe(400)
    expect(taskResponse.body.message).toEqual('Invalid task data')
  })

  test('returns a error with status code 400 if passed task cannot be succesfully mapped to database format', async () => {
    const date = new Date()
    date.setDate(date.getDate() - 3)
    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const task: ITask = {
      id: 1,
      plantId: 1,
      type: 'water',
      status: 'future',
      date: dateString,
    }

    const taskResponse = await request(app).post('/api/v1/tasks').set('Cookie', authToken).send(task)

    expect(taskResponse.status).toBe(400)
    expect(taskResponse.body.message).toEqual('Invalid task data')
  })

  test('returns a error with status code 400 if passed task cannot be succesfully mapped to database format', async () => {
    jest.spyOn(prisma.task, 'create').mockImplementation(() => {
      throw new Error('Database error')
    })
    const date = new Date()
    date.setDate(date.getDate() + 3)
    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const task: ITask = {
      id: 1,
      plantId: 1,
      type: 'water',
      status: 'future',
      date: dateString,
    }

    const taskResponse = await request(app).post('/api/v1/tasks').set('Cookie', authToken).send(task)

    expect(taskResponse.status).toBe(502)
    expect(taskResponse.body.message).toEqual('Failed to create task')
  })
})
