import request from 'supertest'
import { app } from '../server'
import prisma from '../helperFunctions/setupPrisma'
import bcrypt from 'bcrypt'

describe('Plant PATCH endpoint', () => {
  let authToken
  let plantId

  beforeEach(async () => {
    const encryptedPassword = await bcrypt.hash('Password123', 10)
    await prisma.user.create({
      data: {
        username: 'test_user',
        password: encryptedPassword,
      },
    })

    const plant = await prisma.plant.create({
      data: {
        name: 'Test plant',
        description: 'A plant for testing',
        image: 'plant.jpg',
        latinName: 'Plantus testus',
        user: {
          connect: {
            username: 'test_user',
          },
        },
      },
    })

    plantId = plant.id

    // Login the user and save the auth token for future requests
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

  test('returns a successful response with status code 200 if plant is successfully updated', async () => {
    const updatedPlant = {
      name: 'Updated plant name',
      description: 'Updated plant description',
      image: 'updated-plant.jpg',
      latinName: 'Updated plantus testus',
    }

    const response = await request(app).patch(`/api/v1/plants/${plantId}`).set('Cookie', authToken).send(updatedPlant)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Plant updated successfully')
    expect(response.body.status).toBe('success')

    const plant = await prisma.plant.findUnique({
      where: { id: plantId },
      include: { user: true },
    })

    expect(plant).toMatchObject(updatedPlant)
  })

  test('returns 400 status and error message when failed to update plant (not valid plantId)', async () => {
    const updatedPlant = {
      name: 'Updated plant name',
      description: 'Updated plant description',
      image: 'updated-plant.jpg',
      latinName: 'Updated plantus testus',
    }

    const response = await request(app).patch('/api/v1/plants/999').set('Cookie', authToken).send(updatedPlant)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Failed to update plant')
    expect(response.body.status).toBe('error')
  })

  test('returns 401 status and error message when not authenticated', async () => {
    const updatedPlant = {
      name: 'Updated plant name',
      description: 'Updated plant description',
      image: 'updated-plant.jpg',
      latinName: 'Updated plantus testus',
    }

    const response = await request(app).patch(`/api/v1/plants/${plantId}`).send(updatedPlant)

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
    expect(response.body.status).toBe('error')
  })
})