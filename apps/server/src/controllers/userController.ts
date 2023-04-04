import express from 'express'
import { validatePassword } from '../businessLogic/users/validatePassword'
import bcrypt from 'bcrypt'
import prisma from '../helperFunctions/setupPrisma'

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
  const { query } = req
  res.send({ message: 'Welcome to userRouter!' })
})

userRouter.post('/', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required!', status: 'error' })
  }
  if (!validatePassword(password)) {
    res.status(400).send({ message: 'Password is not valid!', status: 'error' })
  }
  res.status(201).json({ message: 'User successfully registered', status: 'success' })
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
  } catch (error) {
    res.status(400).json({ message: 'User already exists!', status: 'error' })
  }
})

export default userRouter
