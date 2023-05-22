import {rest} from 'msw'
import { SERVER_URL } from "../../config";

export const handlers = [

  rest.get(`${SERVER_URL}/users?username=fakeUser1&password=fakePassword1`, (req, res, ctx) => {
    if(req.url.searchParams.get('username') === 'fakeUser1' && req.url.searchParams.get('password') === 'fakePassword1') {
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
]


