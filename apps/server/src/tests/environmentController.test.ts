import request from 'supertest'

import prisma from '../helperFunctions/setupPrisma'
import bcrypt from 'bcrypt'
import { app } from '../server'

describe('Patch environment', () => {
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
      data:{
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

    
    const loginResponse = await request(app).get('/api/v1/users').query({
      username: 'test_user',
      password: 'Password123',
    })

    authToken = loginResponse.headers['set-cookie'][0].split(';')[0]
  })

  afterEach(async () => {
    await prisma.plant.deleteMany()
    await prisma.user.deleteMany()
  })

  test('returns 400 status and error message when failed to update plant (not valid plantId)', async () => {
    const updatedPlant = {
      name: 'Updated plant name',
      nickName: 'Updated plant nickName',
      image: 'updated-plant.jpg',
      latinName: 'Updated plantus testus',
      idealEnvironment: {
        minCo2: 100,
        maxCo2: 200,
        minHumidity: 10,
        maxHumidity: 20,
        minTemperature: 10,
        maxTemperature: 20,
      },
    }

    const response = await request(app).patch('/api/v1/plants/999').set('Cookie', authToken).send(updatedPlant)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Failed to update plant')
    expect(response.body.status).toBe('error')
  })

  test('returns 400 status and error message if type is invalid', async () => {
    const response = await request(app).get(`/api/v1/plants/${plantId}/environment/invalid_type`).set('Cookie', authToken)
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Wrong type')
    expect(response.body.status).toBe('error')
  })
  



})