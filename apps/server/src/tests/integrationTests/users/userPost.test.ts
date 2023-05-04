import request from 'supertest'
import { app } from '../../../server'
import prisma from '../../../helperFunctions/setupPrisma'

describe('User registration', () => {
  afterEach(async () => {
    await prisma.user.deleteMany()
  })

  test('POST /api/v1/users should return 201 and success message for valid input', async () => {
    const validUserData = {
      username: 'testuser',
      password: 'ValidPassword123!',
    }

    const response = await request(app).post('/api/v1/users').send(validUserData)

    expect(response.status).toBe(201)
    expect(response.body.status).toBe('success')
    expect(response.body.message).toBe('User successfully registered')
  })

  test('POST /api/v1/users should return 400 and error message for missing input', async () => {
    const invalidUserData = {}

    const response = await request(app).post('/api/v1/users').send(invalidUserData)

    expect(response.status).toBe(400)
    expect(response.body.status).toBe('error')
    expect(response.body.message).toBe('Email and password are required!')
  })

  test('POST /api/v1/users should return 400 and error message for invalid password', async () => {
    const invalidUserData = {
      username: 'testuser',
      password: 'invalid',
    }

    const response = await request(app).post('/api/v1/users').send(invalidUserData)

    expect(response.status).toBe(400)
    expect(response.body.status).toBe('error')
    expect(response.body.message).toBe('Password is not valid!')
  })

  test('POST /api/v1/users should return 400 and error message for existing user', async () => {
    const existingUserData = {
      username: 'testuser',
      password: 'ValidPassword123',
    }

    await request(app).post('/api/v1/users').send(existingUserData)
    const response = await request(app).post('/api/v1/users').send(existingUserData)

    expect(response.status).toBe(400)
    expect(response.body.status).toBe('error')
    expect(response.body.message).toBe('User already exists!')
  })

  test('POST /api/v1/users should return error status if database error occurs', async () => {
    jest.spyOn(prisma.user, 'create').mockImplementation(() => {
      throw new Error('Database error')
    })

    const response = await request(app).post('/api/v1/users').send({
      username: 'existing_user',
      password: 'Password123',
    })

    expect(response.statusCode).toBe(400)
    expect(response.body.status).toBe('error')
  })
})
