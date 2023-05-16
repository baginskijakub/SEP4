import express from 'express'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRouter from './controllers/usersController'
import plantsRouter from './controllers/plantsController'
import tasksRouter from './controllers/tasksController'
import cors from 'cors'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export const app = express()

app.use(cors({ origin: 'http://localhost:4200', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/users', userRouter)

app.use('/api/v1/plants', plantsRouter)

app.use('/api/v1/tasks', tasksRouter)