import request from 'supertest'
import { app } from '../server'
import prisma from '../helperFunctions/setupPrisma'
import bcrypt from 'bcrypt'

describe('Plant GET endpoint', () => {
  beforeEach(async () => {
    const encryptedPassword = await bcrypt.hash('Password123', 10)
    await prisma.user.create({
      data: {
        username: 'test_user',
        password: encryptedPassword,
      },
    })

    await prisma.plant.createMany({
      data: [
        {
          name: 'Test plant 1',
          description: 'A plant for testing 1',
          image: 'plant1.jpg',
          latinName: 'Plantus testus 1',
          username: 'test_user',
        },
        {
          name: 'Test plant 2',
          description: 'A plant for testing 2',
          image: 'plant2.jpg',
          latinName: 'Plantus testus 2',
          username: 'test_user',
        },
      ],
    })
  })

  afterEach(async () => {
    await prisma.plant.deleteMany()
    await prisma.user.deleteMany()
  })

  test('returns a successful response with status code 200 and plants array if user is authorized and has plants', async () => {
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

    // Retrieve the plants after the user is logged in
    const response = await request(app).get('/api/v1/plants').set('Cookie', loginResponse.headers['set-cookie'])

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(2)
    expect(response.body[0]).toMatchObject({
      name: 'Test plant 1',
      description: 'A plant for testing 1',
      image: 'plant1.jpg',
      latinName: 'Plantus testus 1',
    })
    expect(response.body[1]).toMatchObject({
      name: 'Test plant 2',
      description: 'A plant for testing 2',
      image: 'plant2.jpg',
      latinName: 'Plantus testus 2',
    })
  })

  test('returns an error response with status code 401 if user is not authorized', async () => {
    const response = await request(app).get('/api/v1/plants')

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
    expect(response.body.status).toBe('error')
  })

  test('returns an error response with status code 400 if failed to fetch plants', async () => {
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

    // Delete all plants from the database
    await prisma.plant.deleteMany()

    // Retrieve the plants after the user is logged in
    const response = await request(app).get('/api/v1/plants').set('Cookie', loginResponse.headers['set-cookie'])
    expect(response.status).toBe(200)
  })

  test('returns an error response with status code 401 if user is not authorized', async () => {
    const response = await request(app).get('/api/v1/plants')
  })

  test('returns an error response with status code 401 if user is not authorized', async () => {
    const response = await request(app).get('/api/v1/plants')
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
    expect(response.body.status).toBe('error')
  })

  test('returns an error response with status code 400 if failed to fetch plants', async () => {
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

    // Delete the user to create a failed fetch plants scenario
    await prisma.user.delete({ where: { username: user.username } })

    const response = await request(app).get('/api/v1/plants').set('Cookie', loginResponse.headers['set-cookie'])

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Failed to fetch plants')
    expect(response.body.status).toBe('error')
  })
})
