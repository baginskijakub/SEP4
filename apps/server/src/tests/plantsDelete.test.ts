import request from 'supertest'
import { app } from '../server'
import prisma from '../helperFunctions/setupPrisma'
import bcrypt from 'bcrypt'

describe('Plant DELETE endpoint', () => {
  let authToken: string

  beforeEach(async () => {
    const encryptedPassword = await bcrypt.hash('Password123', 10)
    await prisma.user.create({
      data: {
        username: 'test_user',
        password: encryptedPassword,
      },
    })
  })

  afterEach(async () => {
    await prisma.plant.deleteMany()
    await prisma.user.deleteMany()
  })

  beforeEach(async () => {
    const user = {
      username: 'test_user',
      password: 'Password123',
    }

    // Login the user and get the auth token
    const loginResponse = await request(app).get('/api/v1/users').query(user)
    authToken = loginResponse.headers['set-cookie'][0].split(';')[0]
  })

  test('returns a successful response with status code 200 if plant is successfully deleted', async () => {
    const plant = await prisma.plant.create({
      data: {
        name: 'Test plant',
        description: 'A plant for testing',
        image: 'plant.jpg',
        latinName: 'Plantus testus',
        username: 'test_user',
      },
    })

    const response = await request(app).delete(`/api/v1/plants/${plant.id}`).set('Cookie', authToken)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Plant deleted successfully')
    expect(response.body.status).toBe('success')
  })

  test('returns 400 status and error message when failed to delete plant (not authorized user)', async () => {
    const plant = await prisma.plant.create({
      data: {
        name: 'Test plant',
        description: 'A plant for testing',
        image: 'plant.jpg',
        latinName: 'Plantus testus',
        username: 'another_user',
      },
    })

    const response = await request(app).delete(`/api/v1/plants/${plant.id}`).set('Cookie', authToken)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Failed to delete plant')
    expect(response.body.status).toBe('error')
  })

  test('returns 400 status and error message when failed to delete plant (invalid plant id)', async () => {
    const response = await request(app).delete('/api/v1/plants/invalid_id').set('Cookie', authToken)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Failed to delete plant')
    expect(response.body.status).toBe('error')
  })
})
