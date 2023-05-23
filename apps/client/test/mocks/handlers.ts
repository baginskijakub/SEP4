import { rest } from 'msw'
import { SERVER_URL } from '../../config'

export const handlers = [
  // login mock
  rest.get(`${SERVER_URL}/users?username=fakeUser1&password=fakePassword1`, (req, res, ctx) => {
    if (
      req.url.searchParams.get('username') === 'fakeUser1' &&
      req.url.searchParams.get('password') === 'fakePassword1'
    ) {
      return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          username: 'essa',
          email: 'fakeUser1',
        }),
      )
    }
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
]
