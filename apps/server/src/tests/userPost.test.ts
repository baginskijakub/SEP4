/// <reference types="jest" />

import request from 'supertest'
import express from 'express'
import userRouter from '../controllers/userController'

const app = express()
app.use(express.json())
app.use('/user', userRouter)

describe('User registration', () => {
  test('POST /user should return 201 and success message for valid input', async () => {
    const validUserData = {
      username: 'testuser',
      password: 'ValidPassword123!',
    }

    const response = await request(app).post('/user').send(validUserData)

    expect(response.status).toBe(201)
    expect(response.body.status).toBe('success')
    expect(response.body.message).toBe('User successfully registered')
  })

  test('POST /user should return 400 and error message for missing input', async () => {
    const invalidUserData = {}

    const response = await request(app).post('/user').send(invalidUserData)

    expect(response.status).toBe(400)
    expect(response.body.status).toBe('error')
    expect(response.body.message).toBe('Email and password are required!')
  })

  test('POST /user should return 400 and error message for invalid password', async () => {
    const invalidUserData = {
      username: 'testuser',
      password: 'invalid',
    }

    const response = await request(app).post('/user').send(invalidUserData)

    expect(response.status).toBe(400)
    expect(response.body.status).toBe('error')
    expect(response.body.message).toBe('Password is not valid!')
  })

  test('POST /user should return 400 and error message for existing user', async () => {
    const existingUserData = {
      username: 'testuser',
      password: 'ValidPassword123!',
    }

    const response = await request(app).post('/user').send(existingUserData)

    expect(response.status).toBe(400)
    expect(response.body.status).toBe('error')
    expect(response.body.message).toBe('User already exists!')
  })
})
