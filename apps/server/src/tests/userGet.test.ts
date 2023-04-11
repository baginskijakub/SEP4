const request = require('supertest')
const app = require('../app') // where is instance of an Express application?

describe('User GET endpoint', () => {
  test('returns 400 if username or password is not provided', async () => {
    const response = await request(app).get('/users/').query({})

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Username and password are required!')
    expect(response.body.status).toBe('error')
  })

  test('returns 400 if user does not exist', async () => {
    const response = await request(app).get('/users/').query({
      username: 'nonexistent_user',
      password: 'password123',
    })

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('User does not exist!')
    expect(response.body.status).toBe('error')
  })

  test('returns 400 if password is incorrect', async () => {
    const response = await request(app).get('/users/').query({
      username: 'existing_user',
      password: 'wrong_password',
    })

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Password is incorrect!')
    expect(response.body.status).toBe('error')
  })

  test('returns 200 with a token if user exists and password is correct', async () => {
    const response = await request(app).get('/users/').query({
      username: 'existing_user',
      password: 'correct_password',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('User successfully logged in')
    expect(response.body.status).toBe('success')
    expect(response.header['set-cookie'][0]).toMatch(/token=.+/)
  })

  test('returns 502 if database error occurs', async () => {
    jest.spyOn(require('../helperFunctions/setupPrisma'), 'default').mockImplementation(() => {
      throw new Error('Database error')
    })

    const response = await request(app).get('/users/').query({
      username: 'existing_user',
      password: 'correct_password',
    })

    expect(response.statusCode).toBe(502)
    expect(response.body.message).toBe('Database error')
    expect(response.body.status).toBe('error')
  })
})
