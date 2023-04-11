import express from 'express'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRouter from './controllers/userController'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/users', userRouter)
