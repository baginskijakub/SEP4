import { rest } from 'msw'
import { SERVER_URL } from '../../config'

export const handlers = [
  // login mock
  rest.get(`${SERVER_URL}/users`, (req, res, ctx) => {
    if (req.url.searchParams.get('email') === 'fakeUser1' && req.url.searchParams.get('password') === 'fakePassword1') {
      return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          username: 'essa',
          email: 'fakeUser1',
        }),
      )
    }
    else {
      return res(
        ctx.status(401),
        ctx.json({
          message: 'Invalid credentials',
        }),
      )
    }
  }),

  rest.get(`${SERVER_URL}/tasks/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([]),
    )
  }),

  // register mock
  rest.post(`${SERVER_URL}/users`, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 1,
        username: 'essa',
        email: 'fakeUser1',
      }),
    )
  }),

  //add plant mock
  rest.post(`${SERVER_URL}/plants`, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        message: 'Plant added successfully',
      }),
    )
  }),

  //get plants mock
  rest.get(`${SERVER_URL}/plants`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'fakePlant1',
          latinName: 'fakeLatinName1',
          nickName: 'fakeNickName1',
        },
      ]),
    )
  }),
]
