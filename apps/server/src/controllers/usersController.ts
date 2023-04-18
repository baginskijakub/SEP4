import express from 'express'
import { validatePassword } from '../businessLogic/users/validatePassword'
import bcrypt from 'bcrypt'
import prisma from '../helperFunctions/setupPrisma'
import jwt from 'jsonwebtoken'

const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
  const { query } = req
  const username = query.username as string
  const password = query.password as string
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required!', status: 'error' })
    return
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })
    if (!user) {
      res.status(400).json({ message: 'User does not exist!', status: 'error' })
      return
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      res.status(400).json({ message: 'Password is incorrect!', status: 'error' })
      return
    }
    const token = jwt.sign({ username: user.username }, process.env.WEB_TOKEN_SECRET)
    res
      .cookie('token', token, { httpOnly: true, domain: 'localhost' })
      .status(200)
      .json({ message: 'User successfully logged in', status: 'success' })
  } catch (error) {
    console.log(error)
    res.status(502).json({ message: 'Database error', status: 'error' })
  }
})

userRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400).json({ message: 'Email and password are required!', status: 'error' })
    return
  }
  if (!validatePassword(password)) {
    res.status(400).send({ message: 'Password is not valid!', status: 'error' })
    return
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    })
    res.status(201).json({ message: 'User successfully registered', status: 'success' })
  } catch (error) {
    res.status(400).json({ message: 'User already exists!', status: 'error' })
  }
})

export default userRouter
