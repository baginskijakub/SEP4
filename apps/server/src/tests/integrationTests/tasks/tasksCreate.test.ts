import request from 'supertest'
import prisma from '../../../helperFunctions/setupPrisma'
import bcrypt from 'bcrypt'
import { app } from '../../../server'
import { ITask } from '@sep4/types';
import { taskConverter } from '../../../helperFunctions/taskHelper'; 


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
    const loginResponse = await request(app).get('/api/v1/users').query({
      username: 'test_user',
      password: 'Password123',
    })


    const task: ITask = {
      id: 1,
      plantId: 2,
      type: 'water',
      status: 'future',
      date: '2023-05-20',
    };

    const convertedTask = taskConverter(task);
    console.log(convertedTask)
    const taskResponse = await request(app)
      .post('/api/tasks')
      .set('Cookie', loginResponse.headers['set-cookie'])
      .send(convertedTask);

    expect(taskResponse.status).toBe(201);
  });


})