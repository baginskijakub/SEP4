import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export interface UserRequest extends Request {
  user: { email: string }
}

export default function authorizeUser(req: UserRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401).json({ message: 'Unauthorized', status: 'error' })
    return
  }
  try {
    const decodedToken = jwt.verify(token, process.env.WEB_TOKEN_SECRET) as { email: string }
    if (!decodedToken) {
      res.status(401).json({ message: 'Unauthorized', status: 'error' })
      return
    }
    req.user = decodedToken

    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Unable to authorize ', status: 'error' })
  }
}
